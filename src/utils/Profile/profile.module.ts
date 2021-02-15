import { Module } from '@nestjs/common';

import { UserPropertyModule } from '../../database/UserProperty/user_property.module';

import { ProfileService } from './profile.service';

@Module({
  imports: [UserPropertyModule],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
