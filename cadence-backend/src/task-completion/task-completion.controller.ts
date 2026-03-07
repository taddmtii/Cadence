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

  // Get TaskCompletion by ID
  @Get(':id')
  async getTaskCompletionById(@Param('id') id: string): Promise<TaskCompletion | null> {
    return this.TaskCompletionService.taskCompletion({ id: id });
  }

  // Get all TaskCompletion
  @Get()
  async getAllTaskCompletions(): Promise<TaskCompletion[] | null> {
    return this.TaskCompletionService.taskCompletions({})
  }

  // Update TaskCompletion via ID
  @Patch(':id')
  async updateTaskCompletion(@Param('id') id: string, @Body() data: { date: Date; completedAt: Date; taskId: string; userId: string }): Promise<TaskCompletion | null> {
    return this.TaskCompletionService.updateTaskCompletions({
      where: { id },
      data: data
    })
  }

  // Delete TaskCompletion ID
  @Delete(':id')
  async deleteTaskCompletion(@Param('id') id: string): Promise<TaskCompletion> {
    return this.TaskCompletionService.deleteTaskCompletions({ id })
  }
}
