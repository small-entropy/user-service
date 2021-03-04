import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../../common/dto/create_user.dto';
import { UserService } from '../../database/User/user.service';
import { ProfileService } from '../../utils/Profile/profile.service';

@Injectable()
export class RegisterService {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  /**
   * Method for register user
   * @param {CreateUserDTO} createUserDto record for create user data
   */
  async register(createUserDto: CreateUserDTO) {
    try {
      const user = await this.userService.create(createUserDto);
      const uuid = user._id;
      const profile = await this.profileService.create(uuid);
      return { user, profile };
    } catch (error) {
      throw error;
    }
  }
}
