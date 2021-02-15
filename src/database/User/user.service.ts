import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateUserDTO } from '../../common/dto/create_user.dto';
import { IUser } from '../../common/interfaces/user.interface';
import { User, UserDocument } from './user.schema';

import { PasswordService } from '../../utils/Password/password.service';

@Injectable()
export class UserService {
  constructor(
    private passwordService: PasswordService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  /**
   * Method for create user document
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDTO) {
    try {
      const toCreate = {
        ...createUserDto,
        password: this.passwordService.getPasswordHash(createUserDto.password)
      };

      const createdUser = new this.userModel(toCreate);
      return await createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for update user document
   * @param {string} uuid         user UUID
   * @param {IUser}  toUpdateRaw  user data for update
   */
  async update(uuid: string, toUpdateRaw: IUser) {
    try {
      const BLACK_FIELDS: Array<string> = ['registrationDate', 'active'];
      const NOT_IN_INDEX = -1;
      const toUpdate: Record<string, unknown> = {};

      Object.keys(toUpdateRaw).forEach((key: string): void => {
        if (BLACK_FIELDS.indexOf(key) === NOT_IN_INDEX) {
          toUpdate[key] = toUpdateRaw[key];
        }
      });
      return await this.userModel.updateOne({ _id: Types.ObjectId }, toUpdate);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for find get user list
   * @param {object} filter filter object
   */
  async findAll(filter = { active: true }) {
    try {
      return await this.userModel.find(filter).exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for get user document by username
   * @param {string} username username for find
   */
  async findOne(username: string) {
    try {
      const active = true;
      return await this.userModel.findOne({ username, active });
    } catch (error) {
      throw error;
    }
  }
}
