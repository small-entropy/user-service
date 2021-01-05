import { Module } from '@nestjs/common';

import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

import { UserModule } from '../Users/users.module';
import { AnswerModule } from '../Answer/answer.module';
import { ProfileModule } from '../Profile/profile.module';
import { AuthModule } from '../Authentication/auth.module';

@Module({
  imports: [
    UserModule,
    AnswerModule,
    ProfileModule,
    AuthModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}