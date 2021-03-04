import { Request, Controller, Get, UseGuards } from '@nestjs/common';

import { ApiUserPropertyService } from './api_user_property.service';
import { AnswerService } from '../../utils/Answer/answer.service';

import { JwtAuthGuard } from '../../utils/Authentication/jwt-auth.guard';

@Controller('user-properties')
export class ApiUserPropertyController {
  constructor(
    private apiUserPropertyService: ApiUserPropertyService,
    private answerService: AnswerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Request() req) {
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const uuid = req?.user?.uuid;
      data = await this.apiUserPropertyService.list(uuid);
      meta = {};
    } catch (error) {
      errors = [error];
    }
    return this.answerService.getAnswer(data, errors, meta);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/only-service')
  async listOfServiceProperty(@Request() req) {
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const uuid = req?.user?.uuid;
      data = await this.apiUserPropertyService.listOfServiceProperty(uuid);
      meta = {};
    } catch (error) {
      errors = [error];
    }
    return this.answerService.getAnswer(data, errors, meta);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/not-service')
  async listOfNorServiceProperty(@Request() req) {
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const uuid = req?.user?.uuid;
      meta = {};
      data = await this.apiUserPropertyService.listOfNotServiceProperty(uuid);
    } catch (error) {
      errors = [error];
    }
    return this.answerService.getAnswer(data, errors, meta);
  }
}
