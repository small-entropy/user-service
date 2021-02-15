import { Get, Controller } from '@nestjs/common';
import { ApiSystemService } from './api_system.service';
import { AnswerService } from '../../utils/Answer/answer.service';

@Controller('system')
export class ApiSystemController {
  constructor(
    private apiSystemService: ApiSystemService,
    private answerService: AnswerService,
  ) { }

  @Get('health')
  async getHealth() {
    const data = this.apiSystemService.getHealt()
    return await this.answerService.getAnswer(data, null, null);
  }
}