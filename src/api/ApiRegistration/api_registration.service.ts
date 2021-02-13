import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../../common/dto/create_user.dto';
import { UserService } from '../../database/User/user.service';
import { UserPropertyService } from '../../database/UserProperty/user_property.service';
import { DEFAULT_PROFILE_FIELDS } from '../../common/constants/profile.constants';
@Injectable()
export class RegisterService {
  constructor(
    private userService: UserService,
    private userPropertyService: UserPropertyService,
  ) {}

  async register(createUserDto: CreateUserDTO) {
    try {
      const user = await this.userService.create(createUserDto);
      const uuid = user._id;
      let property_value;
      const profile_promises = DEFAULT_PROFILE_FIELDS.map((field) => {
        return new Promise((resolve, reject) => {
          try {
            switch (field) {
              case 'sex':
                property_value = 'Unknown sex';
                break;
              case 'firstName':
                property_value = 'First name unknown';
                break;
              case 'middleName':
                property_value = 'Middle name unknown';
                break;
              case 'lastName':
                property_value = 'Last name unknown';
                break;
              case 'description':
                property_value = 'Description not filled in';
                break;
              default:
                property_value = 'empty';
                break;
            }
            const userProperty = this.userPropertyService.create(
              uuid,
              field,
              property_value,
            );
            resolve(userProperty);
          } catch (error) {
            reject(error);
          }
        });
      });
      const results = await Promise.all(profile_promises);
      const profile = {};
      results.forEach((property: Record<string, any>) => {
        profile[property.name] = property.value;
      });
      return { user, profile };
    } catch (error) {
      throw error;
    }
  }
}
