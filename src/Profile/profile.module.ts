import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswerModule } from '../Answer/answer.module';

import { Profile, ProfileSchema } from './profile.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule } from '../Authentication/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
    ]),
    AnswerModule,
    AuthModule,
  ],
  controllers:[ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
