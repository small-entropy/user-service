import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateUserDTO } from '../DataTransferObjects/user.dto';
import { IUser } from '../Interfaces/user.interface';
import { User, UserDocument } from './user.schema';

import { PasswordService } from '../Password/password.service';

@Injectable()
export class UserService {
  constructor(
    private passwordService: PasswordService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    const toCreate = {
      ...createUserDto,
      password: this.passwordService.getPasswordHash(createUserDto.password),
    };
    const createdUser = new this.userModel(toCreate);
    return createdUser.save();
  }

  async update(uuid: string, toUpdateRaw: IUser): Promise<UserDocument> {
    const blackFields: Array<string> = ['registrationDate', 'active'];
    const notInFieldIndex = -1;
    const toUpdate: IUser = {};
    Object.keys(toUpdateRaw).forEach((key: string): void => {
      if (blackFields.indexOf(key) === notInFieldIndex) {
        toUpdate[key] = toUpdateRaw[key];
      }
    });
    return this.userModel.updateOne({ _id: Types.ObjectId }, toUpdate);
  }

  async findAll(filter = {}): Promise<UserDocument[]> {
    return this.userModel.find(filter).exec();
  }

  async findOne(username: string): Promise<UserDocument | undefined> {
    const active = true;
    return this.userModel.findOne({ username, active });
  }
}
