import { Controller } from '@nestjs/common';
import { CreateUserDTO } from '../Common/user.dto';

import { UserService } from './users.service';
@Controller()
export class UsersController {
  constructor(private userService: UserService) {}

  async create(createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  async findAll() {
    return await this.userService.findAll();
  }
}
