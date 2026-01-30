import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Category, Frequency, Task, TaskCompletion } from '@prisma/client';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) { }

  // @Post()
  // async task(
  //   @Body() data: {
  //     name: string,
  //     createdAt: Date,
  //     updatedAt: Date,
  //     archived: Boolean,
  //     archivedAt: Date,
  //     description: string,
  //     frequency: Frequency,
  //     categoryId: string,
  //     taskGroupId: string,
  //     userId: string,
  //     completions: TaskCompletion[]
  //   },
  // ): Promise<Task> {
  //   return this.TaskService.createTask(data);
  // }

  // @Get(':id')
  // async getTaskById(@Param('id') id: string): Promise<Task | null> {
  //   return this.TaskService.task({ id: id });
  // }


  // @Get()
  // async getAllTaskGroups(): Promise<Task[] | null> {
  //   return this.TaskService.tasks({})
  // }

  // @Patch(':id')
  // async updateTaskGroup(@Param('id') id: string, @Body() data: { name: string, createdAt: Date, updatedAt: Date, archived: Boolean, archivedAt: Date, description: string, frequency: Frequency, categoryId: string, taskGroupId: string, userId: string, completions: TaskCompletion[] }): Promise<Task | null> {
  //   return this.TaskService.updateTask({
  //     where: { id },
  //     data: data
  //   })
  // }

  // @Delete(':id')
  // async deleteTaskGroup(@Param('id') id: string): Promise<Task> {
  //   return this.TaskService.deleteTask({ id })
  // }
}
