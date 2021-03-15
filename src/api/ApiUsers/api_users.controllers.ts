import { Controller, Get } from '@nestjs/common';

import { ApiUsersService } from './api_users.service';
import { AnswerService } from '../../utils/Answer/answer.service';

@Controller('users')
export class ApiUsersController {
  constructor(
    private apiUsersService: ApiUsersService,
    private answerService: AnswerService,
  ) {}

  @Get('/list')
  async getUsersList() {}

  @Get('/entity/:uuid')
  async getUserBy() {}
}
