import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';

import { ApiLoginService } from './api_login.service';

import { LocalAuthGuard } from '../../utils/Authentication/local-auth.guard';
import { JwtAuthGuard } from '../../utils/Authentication/jwt-auth.guard';

import { AnswerService } from '../../utils/Answer/answer.service';

@Controller('login')
export class ApiLoginController {
  constructor(
    private answerSerivce: AnswerService,
    private apiLoginService: ApiLoginService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async loginByData(@Request() req) {
    try {
      const { user } = req;
      const { data, meta } = await this.apiLoginService.loginByData(user);
      return this.answerSerivce.getAnswer(data, null, meta);
    } catch (error) {
      return this.answerSerivce.getAnswer(null, [error], null);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async loginByToken(@Request() req) {
    try {
      const { data, meta } = await this.apiLoginService.loginByToken(req);
      return this.answerSerivce.getAnswer(data, null, meta);
    } catch (error) {
      return this.answerSerivce.getAnswer(null, [error], null);
    }
  }
}
