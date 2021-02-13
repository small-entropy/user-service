import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';

import { PasswordModule  } from '../../utils/Password/password.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
    PasswordModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}