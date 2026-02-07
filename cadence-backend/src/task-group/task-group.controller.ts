import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskGroup } from '@prisma/client';
import { TaskGroupService } from './taskGroup.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task-group')
export class TaskGroupController {
  constructor(private readonly TaskGroupService: TaskGroupService) { }

  // Create TaskGroup
  @UseGuards(JwtAuthGuard)
  @Post()
  async taskGroup(
    @Body() data: { name: string; userId: string },
  ): Promise<TaskGroup> {
    return this.TaskGroupService.createTaskGroup(data);
  }

  // Get TaskGroup by ID / Name
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTaskGroupById(@Param('id') id: string): Promise<TaskGroup | null> {
    return this.TaskGroupService.taskGroup({ id: id });
  }

  // Get all TaskGroups
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTaskGroups(): Promise<TaskGroup[] | null> {
    return this.TaskGroupService.taskGroups({})
  }

  // Update TaskGroup via ID
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTaskGroup(@Param('id') id: string, @Body() data: { name?: string }): Promise<TaskGroup | null> {
    return this.TaskGroupService.updateTaskGroup({
      where: { id },
      data: data
    })
  }

  // Delete TaskGroup ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTaskGroup(@Param('id') id: string): Promise<TaskGroup> {
    return this.TaskGroupService.deleteTaskGroup({ id })
  }
}
