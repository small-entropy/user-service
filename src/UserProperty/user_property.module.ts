import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswerModule } from '../Answer/answer.module';
import { AuthModule } from '../Authentication/auth.module';

import { UserProperty, UserPropertySchema } from './user_property.schema';
import { UserPropertyController } from './user_property.controller';
import { UserPropertyService } from './user_property.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProperty.name,
        schema: UserPropertySchema,
      },
    ]),
    AuthModule,
    AnswerModule,
  ],
  controllers: [UserPropertyController],
  providers: [UserPropertyService],
  exports: [UserPropertyService],
})
export class UserPropertyModule {}
