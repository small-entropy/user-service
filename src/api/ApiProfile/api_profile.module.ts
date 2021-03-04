import { Module } from '@nestjs/common';

import { AnswerModule } from '../../utils/Answer/answer.module';
import { ProfileModule } from '../../utils/Profile/profile.module';

import { ApiProfileController } from './api_profile.controller';
import { ApiProfileService } from './api_profile.service';

@Module({
  imports: [AnswerModule, ProfileModule],
  controllers: [ApiProfileController],
  providers: [ApiProfileService],
  exports: [ApiProfileService],
})
export class ApiProfileModule {}
