import { Injectable } from '@nestjs/common';

import { UserPropertyService } from '../../database/UserProperty/user_property.service';

@Injectable()
export class ApiUserPropertyService {
  constructor(private userPropertyService: UserPropertyService) {}

  /**
   * Method for get all user properties
   * @param {string} uuid user UUID
   */
  async list(uuid: string) {
    try {
      return await this.userPropertyService.findAllUserProperties(uuid);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for get not service user properties
   * @param {string} uuid user UUID
   */
  async listOfNotServiceProperty(uuid: string) {
    try {
      return await this.userPropertyService.findAllNotServiceProperties(uuid);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method fir get service properties
   * @param {string} uuid user UUID
   */
  async listOfServiceProperty(uuid: string) {
    try {
      return await this.userPropertyService.findAllServiceProperties(uuid);
    } catch (error) {
      throw error;
    }
  }
}
