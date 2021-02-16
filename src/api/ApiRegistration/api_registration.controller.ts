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
    let data = null;
    let errors = null;
    let meta = null;
    try {
      const { user, profile } = await this.registerService.register(
        createUserDto,
      );
      const result = await this.authService.login(user);
      const { _id, username, email } = user;
      data = { uuid: _id, username, email };
      meta = { profile, token: result.access_token };
    } catch (error) {
      errors = [error];
    }
    return this.answerService.getAnswer(data, errors, meta);
  }
}
