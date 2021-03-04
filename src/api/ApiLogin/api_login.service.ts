import { Injectable } from '@nestjs/common';
import { AuthService } from '../../utils/Authentication/authentication.service';
import { ProfileService } from '../../utils/Profile/profile.service';

@Injectable()
export class ApiLoginService {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}

  /**
   * Method for authentication user by request data
   * @param {Record<string, unknown>} user user object from request
   */
  async loginByData(user) {
    try {
      const rawData = await this.authService.login(user);
      const { uuid, username, email, access_token } = rawData;
      const data = { uuid, username, email };
      const profile = await this.profileService.getProfileRecordByUuid(uuid);
      const meta = { token: access_token, profile };
      return { data, meta };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for authentication from headers data
   * @param {Record<string, unknown>} req request record
   */
  async loginByToken(req) {
    try {
      const data = req.user;
      const authHeader = req?.headers?.authorization;
      const token = authHeader ? authHeader.slice(7) : null;
      const profile = await this.profileService.getProfileRecordByUuid(
        data.uuid,
      );
      const meta = { token, profile };
      return { data, meta };
    } catch (error) {
      throw error;
    }
  }
}
