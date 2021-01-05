import { Controller, HttpCode, Post, Body } from '@nestjs/common';

import { CreateUserDTO } from '../Common/user.dto';

import { RegisterService } from '../Register/register.service';
import { AnswerService } from '../Answer/answer.service';
import { ProfileService } from '../Profile/profile.service';
import { AuthService } from '../Authentication/auth.service';

@Controller('register')
export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private answerService: AnswerService,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDTO) {

    const user = await this.registerService.register(createUserDto);
    const profile = await this.profileService.create(user, createUserDto);
    const authUserData = await this.authService.login(user);
    const data = {
      uuid: user._id,
      username: user.username,
      email: user.email
    };
    const meta = {
      profile: {
        uuid: profile._id,
        sex: profile.sex,
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        description: profile.description
      },
      token: authUserData.access_token,
    };
    return this.answerService.getSimpleAnswer(data, null, meta);
  }
}
