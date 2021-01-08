import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Profile, ProfileDocument } from './profile.schema';
import { IProfile } from '../Common/profile.interfaces';
import { CreateUserDTO } from '../Common/user.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(user, profile: CreateUserDTO): Promise<ProfileDocument> {
    const toCreate = {
      ...profile,
      user: user._id || user.uuid,
    };
    const createdProfile = new this.profileModel(toCreate);
    return createdProfile.save();
  }

  async findByUserUuid(uuid: string, active = true): Promise<any | undefined> {
    return this.profileModel
      .find({ user: Types.ObjectId(uuid), active })
      .populate('user');
  }

  async update(user: string, toUpdateRaw: IProfile) {
    const blackFields: Array<string> = ['user'];
    const toUpdate: IProfile = {};
    const notInBlackFieldsIndex = -1;
    Object.keys(toUpdateRaw).forEach((key: string): void => {
      if (blackFields.indexOf(key) === notInBlackFieldsIndex) {
        toUpdate[key] = toUpdateRaw[key];
      }
    });
    return this.profileModel.update({ user }, toUpdate);
  }
}
