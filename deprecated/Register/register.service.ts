import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../DataTransferObjects/user.dto';
import { UserService } from '../Users/users.service';

@Injectable()
export class RegisterService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDTO) {
    return await this.userService.create(createUserDto);
  }
}
