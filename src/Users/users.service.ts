import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from './create-user.dto';
import { User, UserDocument } from './user.schema';

import { PasswordService } from '../Password/password.service';

@Injectable()
export class UserService {
  constructor(
    private passwordService: PasswordService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const toCreate = {
      ...createUserDto,
      password: this.passwordService.getPasswordHash(createUserDto.password),
    };
    console.log(toCreate);
    const createdUser = new this.userModel(toCreate);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
