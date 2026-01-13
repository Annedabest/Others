import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, AuthPayload } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('status')
  getStatus() {
    return this.authService.getStatus();
  }

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<AuthPayload> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto): Promise<AuthPayload> {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return req.user;
  }
}
