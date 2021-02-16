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
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const { user } = req;
      const result = await this.apiLoginService.loginByData(user);
      data = result.data;
      meta = result.meta;
    } catch (error) {
      errors = [error];
    }
    return this.answerSerivce.getAnswer(data, meta, errors);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async loginByToken(@Request() req) {
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const result = await this.apiLoginService.loginByToken(req);
      data = result.data;
      meta = result.meta;
    } catch (error) {
      errors = [error];
    }
    return this.answerSerivce.getAnswer(data, errors, meta);
  }
}
