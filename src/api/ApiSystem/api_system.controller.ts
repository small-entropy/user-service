import { Get, Controller } from '@nestjs/common';
import { ApiSystemService } from './api_system.service';
import { AnswerService } from '../../utils/Answer/answer.service';

@Controller('system')
export class ApiSystemController {
  constructor(
    private apiSystemService: ApiSystemService,
    private answerService: AnswerService,
  ) {}

  @Get('health')
  async getHealth() {
    let data = null;
    let errors = null;
    let meta = null;
    try {
      data = this.apiSystemService.getHealt();
      meta = {};
    } catch (error) {
      errors = [error];
    }
    return await this.answerService.getAnswer(data, errors, meta);
  }
}
