import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../../database/User/user.module';

import { AuthService } from './authentication.service';
import { LocalStategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './authentication.constants';

import { PasswordModule } from '../Password/password.module';

@Module({
  imports: [
    UserModule,
    PasswordModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStategy, JwtStrategy],
  exports: [AuthService, LocalStategy, JwtStrategy],
})
export class AuthModule {}
