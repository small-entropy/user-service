import { Module } from '@nestjs/common';

import { AnswerModule } from '../../utils/Answer/answer.module';
import { AuthModule } from '../../utils/Authentication/authentication.module';

import { ApiUserPropertyController } from './api_user_property.controller';
import { ApiUserPropertyService } from './api_user_property.service';

@Module({
  imports: [AuthModule, AnswerModule],
  controllers: [ApiUserPropertyController],
  providers: [ApiUserPropertyService],
  exports: [ApiUserPropertyService],
})
export class ApiUserPropertyModule {}
