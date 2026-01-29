import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { TaskCompletion, TaskGroup, User } from '@prisma/client';
import { TaskService } from './task.service';
import { TaskCompletionService } from './taskCompletion.service';
import { TaskGroupService } from './taskGroup.service';
import { CategoryService } from './category.service';

@Controller()
export class AppController {
  constructor(private readonly UserService: UserService,
    private readonly TaskService: TaskService,
    private readonly TaskCompletionService: TaskCompletionService,
    private readonly TaskGroupService: TaskGroupService,
    private readonly CategoryService: CategoryService) { }

  @Post('user')
  async signupUser(
    @Body() data: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.UserService.createUser(data);
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.UserService.user({ id: id });
  }
}
