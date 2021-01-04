import { Controller } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller()
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  simpleAnswer(data?, errors?, meta?) {
    return this.answerService.getSimpleAnswer(data, errors, meta);
  }
}
