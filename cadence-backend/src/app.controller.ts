import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly UserService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() data: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.UserService.createUser(data);
  }
}
