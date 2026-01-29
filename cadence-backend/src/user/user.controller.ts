import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')// base path is /users
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Post()
  async user(
    @Body() data: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.UserService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.UserService.user({ id: id });
  }

  @Get()
  async getAllUsers(): Promise<User[] | null> {
    return this.UserService.users({})
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() data: { name?: string, email?: string }): Promise<User | null> {
    return this.UserService.updateUser({
      where: { id },
      data: data
    })
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.UserService.deleteUser({ id })
  }
}
