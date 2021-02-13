import { Module } from '@nestjs/common';

import { RegisterService } from './api_registration.service';
import { RegisterController } from './api_registration.controller';

import { UserModule } from '../../database/User/user.module';
import { AnswerModule } from '../../utils/Answer/answer.module';
import { AuthModule } from '../../utils/Authentication/authentication.module';
import { UserPropertyModule } from '../../database/UserProperty/user_property.module';
@Module({
  imports: [UserModule, AnswerModule, AuthModule, UserPropertyModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class ApiRegisterModule {}
