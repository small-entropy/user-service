import { Module } from '@nestjs/common';

import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

import { UserModule } from '../Users/users.module';
import { AnswerModule } from '../Answer/answer.module';

@Module({
  imports: [UserModule, AnswerModule,],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}