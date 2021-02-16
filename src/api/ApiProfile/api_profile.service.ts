import { Injectable } from '@nestjs/common';

import { ProfileService } from '../../utils/Profile/profile.service';

@Injectable()
export class ApiProfileService {
  constructor(private profileService: ProfileService) {}

  /**
   * Method for get user profile object by UUID
   * @param {string} uuid user UUID
   */
  async getProfile(uuid: string) {
    try {
      return await this.profileService.getProfileRecordByUuid(uuid);
    } catch (error) {
      throw error;
    }
  }
}
