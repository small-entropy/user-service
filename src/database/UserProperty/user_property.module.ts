import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserProperty, UserPropertySchema } from './user_property.schema';
import { UserPropertyService } from './user_property.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProperty.name,
        schema: UserPropertySchema,
      },
    ]),
  ],
  providers: [UserPropertyService],
  exports: [UserPropertyService],
})
export class UserPropertyModule {}
