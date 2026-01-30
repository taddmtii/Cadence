import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskCompletionService } from './taskCompletion.service';
import { TaskCompletion } from '@prisma/client';

@Controller('task-completion')
export class TaskCompletionController {
  constructor(private readonly TaskCompletionService: TaskCompletionService) { }

  // Create TaskCompletion
  @Post()
  async taskCompletion(
    @Body() data: { date: Date; completedAt: Date; taskId: string; userId: string },
  ): Promise<TaskCompletion> {
    return this.TaskCompletionService.createTaskCompletions(data);
  }

  // Get TaskGroup by ID
  @Get(':id')
  async getTaskGroupById(@Param('id') id: string): Promise<TaskCompletion | null> {
    return this.TaskCompletionService.taskCompletion({ id: id });
  }

  // Get all TaskGroups
  @Get()
  async getAllTaskGroups(): Promise<TaskCompletion[] | null> {
    return this.TaskCompletionService.taskCompletions({})
  }

  // Update TaskGroup via ID
  @Patch(':id')
  async updateTaskGroup(@Param('id') id: string, @Body() data: { date: Date; completedAt: Date; taskId: string; userId: string }): Promise<TaskCompletion | null> {
    return this.TaskCompletionService.updateTaskCompletions({
      where: { id },
      data: data
    })
  }

  // Delete TaskGroup ID
  @Delete(':id')
  async deleteTaskGroup(@Param('id') id: string): Promise<TaskCompletion> {
    return this.TaskCompletionService.deleteTaskCompletions({ id })
  }
}
