import { Controller, HttpCode, Post, Body } from '@nestjs/common';

import { CreateUserDTO } from '../Common/user.dto';
import { RegisterService } from '../Register/register.service';
import { AnswerService } from '../Answer/answer.service';

@Controller('register')
export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private answerService: AnswerService,
  ) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDTO) {
    const rawData = await this.registerService.register(createUserDto);
    const data = {
      uuid: rawData._id,
      username: rawData.username,
      email: rawData.email,
    };
    return this.answerService.getSimpleAnswer(data);
  }
}
