import {
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { AnswerService } from '../Answer/answer.service';

import { JwtAuthGuard } from '../Authentication/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private answerService: AnswerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put('by_user')
  async updateUserProfile(@Param() params, @Request() req) {
    return this.profileService.update(req.user.uuid, req.body);
  }

  @Get('/by_user/:uuid')
  async findByUuid(@Param() params) {
    const rawData = await this.profileService.findByUserUuid(params.uuid);
    const firstIndex = 0;
    const hasData =
      rawData &&
      rawData.length &&
      rawData[firstIndex].user &&
      rawData[firstIndex].user.active
        ? true
        : false;
    let data = null;
    let meta = null;
    if (hasData) {
      const profileData = rawData[firstIndex];
      const userData = profileData.user;
      data = {
        uuid: profileData._id,
        sex: profileData.sex,
        firstName: profileData.firstName,
        middleName: profileData.middleName,
        lastName: profileData.lastName,
        description: profileData.description,
      };
      meta = {
        user: {
          uuid: userData._id,
          username: userData.username,
          email: userData.email,
        },
      };
    }

    return this.answerService.getSimpleAnswer(data, null, meta);
  }
}
