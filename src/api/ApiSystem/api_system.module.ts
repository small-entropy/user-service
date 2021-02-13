import { Module } from '@nestjs/common';
import { ApiSystemService } from './api_system.service';
import { ApiSystemController } from './api_system.controller';
import { AnswerModule } from '../../utils/Answer/answer.module';

@Module({
  imports: [AnswerModule],
  controllers: [ApiSystemController],
  providers: [ApiSystemService],
  exports: [],
})
export class ApiSystemModule { }