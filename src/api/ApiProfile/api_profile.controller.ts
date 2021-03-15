import { Request, Controller, Get, UseGuards, Param } from '@nestjs/common';

import { ApiProfileService } from './api_profile.service';
import { AnswerService } from '../../utils/Answer/answer.service';

import { JwtAuthGuard } from '../../utils/Authentication/jwt-auth.guard';

@Controller('profile')
export class ApiProfileController {
  constructor(
    private apiProfileService: ApiProfileService,
    private answerService: AnswerService,
  ) {}

  @UseGuards(JwtAuthGuard)
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
