import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.UserService.user({ id: id });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[] | null> {
    return this.UserService.users({})
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() data: { name?: string, email?: string }): Promise<User | null> {
    return this.UserService.updateUser({
      where: { id },
      data: data
    })
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.UserService.deleteUser({ id })
  }
}
