import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../database/User/user.service';
import { PasswordService } from '../Password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordServive: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.findOne(username);
      const userPwdHash = user.password;
      const compareResult = this.passwordServive.comparePassword(
        password,
        userPwdHash,
      );
      return compareResult
        ? {
            uuid: user._id,
            password: user.password,
            username: user.username,
            email: user.email,
          }
        : null;
    } catch (error) {
      throw error;
    }
  }

  async login(user: any) {
    const data = {
      username: user.username,
      email: user.email,
      uuid: user.uuid || user._id,
    };
    const access_token = this.jwtService.sign(data);
    return { ...data, access_token };
  }
}
