import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../Users/users.module';
import { AnswerModule } from '../Answer/answer.module';

import { AuthService } from './auth.service';
import { LocalStategy } from './local.stategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './auth.constants';

import { PasswordModule } from '../Password/password.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    AnswerModule,
    PasswordModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
