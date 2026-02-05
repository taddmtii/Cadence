import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.authService.login({ email: data.email }, data.password)
  }

  @Post('signup')
  signup(@Body() data: { firstName: string, lastName: string, email: string, password: string }) {
    return this.authService.signup(data.firstName, data.lastName, data.email, data.password)
  }

  // Validates a JWT token and returns user data.
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
