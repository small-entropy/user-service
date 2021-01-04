import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

import { AnswerService } from '../Answer/answer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private answerService: AnswerService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const rawData = await this.authService.login(req.user);
    const data = {
      uuid: rawData.uuid,
      username: rawData.username,
      email: rawData.email,
    };
    const meta = { token: rawData.access_token };
    return this.answerService.getSimpleAnswer(data, null, meta);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  getProfile(@Request() req) {
    const data = req.user;
    const authHeader = req?.headers?.authorization;
    const token = authHeader ? authHeader.slice(7) : undefined;
    const meta = { token };
    return this.answerService.getSimpleAnswer(data, null, meta);
  }
}
