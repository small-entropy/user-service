import { Injectable } from '@nestjs/common';

import { UserService } from '../../database/User/user.service';
@Injectable()
export class ApiUsersService {
  constructor(private userService: UserService) {}

  /**
   * Method for get user by username
   * @param {string} username searching username
   */
  async getUserByUsername(username: string) {
    try {
      return await this.userService.findOneByUsername(username);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for get user by user UUID
   * @param {string} uuid searching UUID
   */
  async getUserByUuid(uuid: string) {
    try {
      return await this.userService.findOneByUuid(uuid);
    } catch (error) {
      throw error;
    }
  }
}
