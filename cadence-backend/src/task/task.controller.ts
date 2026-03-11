import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { DayOfWeek, Priority, Prisma, Task } from '@prisma/client';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskCompletionService } from 'src/task-completion/taskCompletion.service';
import { UserService } from 'src/user/user.service';

function toTimeDate(time: string): Date {
  if (time === "") {
    return new Date(`1970-01-01T12:00:00.000Z`)
  }
  return new Date(`1970-01-01T${time}:00.000Z`);
}

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService, private readonly TaskCompletionService: TaskCompletionService, private readonly UserService: UserService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async task(
    @Body() data: {
      name: string,
      description: string,
      categoryId: string,
      reminderTime: string,
      recurringDays: DayOfWeek[],
      priority: Priority,
      userId: string,
    },
  ): Promise<Task> {
    return this.TaskService.createTask({
      name: data.name,
      description: data.description,
      category: {
        connect: { id: data.categoryId }
      },
      reminderTime: toTimeDate(data.reminderTime),
      recurringDays: data.recurringDays,
      priority: data.priority,
      user: {
        connect: { id: data.userId }
      },
    }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(): Promise<Task[] | null> {
    return this.TaskService.tasks({})
  }

  @UseGuards(JwtAuthGuard)
  @Get('weeklyGoalForUser/:id')
  async getWeeklyGoalForUser(@Param('id') id: string): Promise<number | null> {
    const user = await this.UserService.user({ id })
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    // helper to convert date to dayofweek.
    function getDayOfWeek(date: Date): DayOfWeek {
      return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }) as DayOfWeek
    }

    // helper to get date string for comparison (YYYY-MM-DD format)
    const getUTCMidnight = (date: Date): Date => {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const getStartOfWeek = (date: Date): Date => {
      const d = new Date(date);
      const day = d.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
      d.setUTCDate(d.getUTCDate() - day); // subtract the day number to get to Sunday
      return getUTCMidnight(d);
    };

    const today = new Date();
    const weekStart = getStartOfWeek(today)

    const yesterday = new Date(today)
    yesterday.setUTCDate(yesterday.getUTCDate() - 1)

    if (yesterday < weekStart) {
      return null;
    }

    let totalScheduled = 0;
    let totalCompleted = 0;

    // loop from weekStart to yesterday
    const currentDate = new Date(weekStart);

    while (currentDate <= yesterday) {
      const dayOfWeek = getDayOfWeek(currentDate);
      const checkDate = getUTCMidnight(currentDate);

      // get tasks scheduled for this day of the week
      const scheduledTasks = await this.TaskService.tasks({
        where: {
          userId: id,
          recurringDays: { has: dayOfWeek }
        }
      });

      // get completions for this specific date
      const completions = await this.TaskCompletionService.taskCompletions({
        where: {
          userId: id,
          date: checkDate
        }
      });

      // count scheduled tasks
      totalScheduled += scheduledTasks.length;

      // count completions that match scheduled tasks
      const scheduledTaskIds = new Set(scheduledTasks.map(t => t.id));
      const validCompletions = completions.filter(c => scheduledTaskIds.has(c.taskId));
      totalCompleted += validCompletions.length;

      // move onto next day
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    // avoid division by zero
    if (totalScheduled === 0) {
      return 100;
    }

    // return the percentage (0-100)
    return Math.round((totalCompleted / totalScheduled) * 100);

  }


  // Counts all days from today where all tasks from user were completed.
  @UseGuards(JwtAuthGuard)
  @Get('currentStreakForUser/:id')
  async getCurrentStreakForUser(@Param('id') id: string): Promise<number | null> {

    const user = await this.UserService.user({ id })
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    let streak: number = 0;

    // start from yesterday since today would not be completed yet.
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1)

    // helper to convert date to dayofweek.
    function getDayOfWeek(date: Date): DayOfWeek {
      return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }) as DayOfWeek
    }

    // helper to get date string for comparison (YYYY-MM-DD format)
    const getUTCMidnight = (date: Date): Date => {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    while (true) {
      if (currentDate < user!.createdAt) {
        break
      }

      const dayOfWeek = getDayOfWeek(currentDate);
      const checkDate = getUTCMidnight(currentDate);

      // get all tasks for the specific day.
      const scheduledTasks = await this.TaskService.tasks({
        where: {
          userId: id,
          recurringDays: { has: dayOfWeek }
        }
      });

      // if no tasks were scheduled, skip day
      if (scheduledTasks.length === 0) {
        currentDate.setDate(currentDate.getDate() - 1);
        continue;
      }

      // gets all completions for specific date.
      const completions = await this.TaskCompletionService.taskCompletions({
        where: {
          userId: id,
          date: getUTCMidnight(currentDate)
        }
      })

      // check if all scheduled tasks were completed.
      const completedTaskIds = new Set(completions.map(c => c.taskId))
      const allTasksCompleted = scheduledTasks.every(task =>
        completedTaskIds.has(task.id)
      );

      if (allTasksCompleted) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
      if (streak > 365) break;
    }
    return streak
  }

  @UseGuards(JwtAuthGuard)
  @Get('allTasksForTodayForUser/:id')
  async getAllTasksForTodayForUser(@Param('id') id: string): Promise<Task[] | null> {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek

    return this.TaskService.tasks({
      where: {
        userId: id,
        recurringDays: { has: today }
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('allCompletedTasksForTodayForUser/:id')
  async getAllCompletedTasksForTodayForUser(@Param('id') id: string): Promise<Task[] | null> {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.TaskService.tasks({
      where: {
        userId: id,
        recurringDays: { has: today },
        completions: {
          some: {
            completedAt: {
              gte: startOfDay,
              lte: endOfDay
            }
          }
        }
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('allTasksForUser/:id')
  async getAllTasksForUser(@Param('id') id: string): Promise<Task[] | null> {
    return this.TaskService.tasks({ where: { userId: id } })
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: Prisma.TaskUncheckedUpdateInput): Promise<Task | null> {
    return this.TaskService.updateTask({
      where: { id },
      data: data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.TaskService.deleteTask({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task | null> {
    return this.TaskService.task({ id: id });
  }
}
