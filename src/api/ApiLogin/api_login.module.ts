import { Module } from '@nestjs/common';

import { AnswerModule } from '../../utils/Answer/answer.module';
import { AuthModule } from '../../utils/Authentication/authentication.module';

import { ApiLoginController } from './api_login.controller';
import { ApiLoginService } from './api_login.service';

import { ProfileModule } from '../../utils/Profile/profile.module';

@Module({
  imports: [AnswerModule, AuthModule, ProfileModule],
  controllers: [ApiLoginController],
  providers: [ApiLoginService],
  exports: [],
})
export class ApiLoginModule {}
