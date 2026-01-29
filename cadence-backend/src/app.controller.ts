import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { TaskCompletion, TaskGroup, User } from '@prisma/client';
import { TaskService } from './task.service';
import { TaskCompletionService } from './taskCompletion.service';
import { TaskGroupService } from './taskGroup.service';
import { CategoryService } from './category.service';

@Controller()
export class AppController {
  constructor(private readonly UserService: UserService) { }

  @Post('user')
  async user(
    @Body() data: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.UserService.createUser(data);
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.UserService.user({ id: id });
  }

  @Get('users')
  async getAllUsers(): Promise<User[] | null> {
    return this.UserService.users({})
  }

  @Put('user/:id')
  async updateUser(@Param('id') id: string, @Body() data: { name?: string, email?: string }): Promise<User | null> {
    return this.UserService.updateUser({
      where: { id },
      data: data
    })
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.UserService.deleteUser({ id })
  }


}
