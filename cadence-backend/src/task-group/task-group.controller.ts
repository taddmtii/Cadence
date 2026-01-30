import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskGroup } from '@prisma/client';
import { TaskGroupService } from './taskGroup.service';

@Controller('task-group')
export class TaskGroupController {
  constructor(private readonly TaskGroupService: TaskGroupService) { }

  // Create TaskGroup
  @Post()
  async taskGroup(
    @Body() data: { name: string; userId: string },
  ): Promise<TaskGroup> {
    return this.TaskGroupService.createTaskGroup(data);
  }

  // Get TaskGroup by ID
  @Get(':id')
  async getTaskGroupById(@Param('id') id: string): Promise<TaskGroup | null> {
    return this.TaskGroupService.taskGroup({ id: id });
  }

  // Get all TaskGroups
  @Get()
  async getAllTaskGroups(): Promise<TaskGroup[] | null> {
    return this.TaskGroupService.taskGroups({})
  }

  // Update TaskGroup via ID
  @Patch(':id')
  async updateTaskGroup(@Param('id') id: string, @Body() data: { name?: string }): Promise<TaskGroup | null> {
    return this.TaskGroupService.updateTaskGroup({
      where: { id },
      data: data
    })
  }

  // Delete TaskGroup ID
  @Delete(':id')
  async deleteTaskGroup(@Param('id') id: string): Promise<TaskGroup> {
    return this.TaskGroupService.deleteTaskGroup({ id })
  }
}
