import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  getSimpleAnswer(data = null, errors = null, meta = null) {
    return { data, errors, meta };
  }
}
