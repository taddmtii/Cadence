import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { DayOfWeek, Priority, Prisma, Task } from '@prisma/client';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

function toTimeDate(time: string): Date {
  return new Date(`1970-01-01T${time}:00.000Z`);
}

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) { }

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
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task | null> {
    return this.TaskService.task({ id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(): Promise<Task[] | null> {
    return this.TaskService.tasks({})
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
}
