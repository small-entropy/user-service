import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../Users/users.service';
import { PasswordService } from '../Password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordServive: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    const userPwdHash = user.password;
    const compareResult = this.passwordServive.comparePassword(
      password,
      userPwdHash,
    );
    if (!compareResult) {
      return null;
    } else {
      const result = {
        uuid: user._id,
        password: user.password,
        username: user.username,
        email: user.email,
      };
      return result;
    }
  }

  async login(user: any) {
    console.log(user);
    const data = {
      username: user.username,
      email: user.email,
      uuid: user.uuid,
    };
    console.log(data);
    const access_token = this.jwtService.sign(data);
    return { ...data, access_token };
  }
}
