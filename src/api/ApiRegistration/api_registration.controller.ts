import { Controller, HttpCode, Post, Body } from '@nestjs/common';

import { CreateUserDTO } from '../../common/dto/create_user.dto';

import { RegisterService } from './api_registration.service';
import { AnswerService } from '../../utils/Answer/answer.service';
import { AuthService } from '../../utils/Authentication/authentication.service';

import { SUCESS_CODES } from '../../common/constants/codes.constants';

@Controller('register')
export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private answerService: AnswerService,
    private authService: AuthService,
  ) {}

  @Post()
  @HttpCode(SUCESS_CODES.CREATED)
  async register(@Body() createUserDto: CreateUserDTO) {
    try {
      const { user, profile } = await this.registerService.register(
        createUserDto,
      );
      const authUserData = await this.authService.login(user);
      const data = {
        uuid: user._id,
        username: user.username,
        email: user.email,
      };
      const meta = {
        profile,
        token: authUserData.access_token,
      };
      return this.answerService.getAnswer(data, null, meta);
    } catch (error) {
      return this.answerService.getAnswer(null, [error], null);
    }
  }
}
