import { Injectable } from '@nestjs/common';

import { UserPropertyService } from '../../database/UserProperty/user_property.service';

import {
  DEFAULT_PROFILE_FIELDS,
  DEFAULT_PROFILE_FIELDS_VALUES,
} from '../../common/constants/profile.constants';

@Injectable()
export class ProfileService {
  constructor(private userPropertyService: UserPropertyService) {}

  private getProfilePromises(uuid) {
    return DEFAULT_PROFILE_FIELDS.map((field) => {
      return new Promise((resolve, reject) => {
        try {
          const userProperty = this.userPropertyService.create(
            uuid,
            field,
            DEFAULT_PROFILE_FIELDS_VALUES[field]
              ? DEFAULT_PROFILE_FIELDS_VALUES[field]
              : 'empty',
            false,
          );
          resolve(userProperty);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private getProfileRecord(properties) {
    const profile = {};
    properties.forEach((property: Record<string, any>) => {
      profile[property.name] = property.value;
    });
    return profile;
  }

  async getProfileRecordByUuid(uuid) {
    try {
      const result = await this.userPropertyService.findAllNotServiceProperties(uuid);
      const profile = this.getProfileRecord(result);
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async getProfileList(uuid) {
    try {
      return await this.userPropertyService.findAllNotServiceProperties(uuid);
    } catch (error) {
      throw error;
    }
  }

  async create(uuid) {
    try {
      const profilePromises = this.getProfilePromises(uuid);
      const results = await Promise.all(profilePromises);
      const profile = this.getProfileRecord(results);
      return profile;
    } catch (error) {
      throw error;
    }
  }
}
