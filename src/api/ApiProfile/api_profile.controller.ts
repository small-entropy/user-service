import { Request, Controller, Get, UseGuards, Param } from '@nestjs/common';

import { ApiProfileService } from './api_profile.service';
import { AnswerService } from '../../utils/Answer/answer.service';;

@Controller('profile')
export class ApiProfileController {
  constructor(
    private apiProfileService: ApiProfileService,
    private answerService: AnswerService,
  ) {}

  @Get(':uuid')
  async getUserProfile(@Request() req, @Param() param) {
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const uuid = param.uuid;
      data = await this.apiProfileService.getProfile(uuid);
      meta = {};
    } catch (error) {
      errors = [error];
    }
    return this.answerService.getAnswer(data, errors, meta);
  }
}
