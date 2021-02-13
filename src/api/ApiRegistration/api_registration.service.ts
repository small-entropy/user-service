import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../../common/dto/create_user.dto';
import { UserService } from '../../database/User/user.service';
import { UserPropertyService } from '../../database/UserProperty/user_property.service';
import {
  DEFAULT_PROFILE_FIELDS,
  DEFAULT_PROFILE_FIELDS_VALUES,
} from '../../common/constants/profile.constants';
@Injectable()
export class RegisterService {
  constructor(
    private userService: UserService,
    private userPropertyService: UserPropertyService,
  ) {}

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

  async register(createUserDto: CreateUserDTO) {
    try {
      const user = await this.userService.create(createUserDto);
      const uuid = user._id;
      const profile_promises = this.getProfilePromises(uuid);
      const results = await Promise.all(profile_promises);
      const profile = this.getProfileRecord(results);
      return { user, profile };
    } catch (error) {
      throw error;
    }
  }
}
