import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Frequency, Prisma, Task } from '@prisma/client';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async task(
    @Body() data: {
      name: string,
      description: string,
      frequency: Frequency,
      categoryId: string,
      userId: string,
    },
  ): Promise<Task> {
    return this.TaskService.createTask({
      name: data.name,
      description: data.description,
      frequency: data.frequency,
      category: {
        connect: { id: data.categoryId }
      },
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
  async getAllTaskGroups(): Promise<Task[] | null> {
    return this.TaskService.tasks({})
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTaskGroup(@Param('id') id: string, @Body() data: Prisma.TaskUncheckedUpdateInput): Promise<Task | null> {
    return this.TaskService.updateTask({
      where: { id },
      data: data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTaskGroup(@Param('id') id: string): Promise<Task> {
    return this.TaskService.deleteTask({ id })
  }
}
