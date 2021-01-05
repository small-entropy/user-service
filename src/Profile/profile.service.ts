import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Profile, ProfileDocument } from './profile.schema';
import { CreateUserDTO } from '../Common/user.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

    async create(user, profile: CreateUserDTO): Promise<ProfileDocument> {
        const toCreate = {
            ...profile,
            user: user._id || user.uuid,
        };
        const createdProfile = new this.profileModel(toCreate);
        return createdProfile.save();
    }

    async findByUserUuid(uuid: string, active = true): Promise<ProfileDocument | undefined> {
        return this.profileModel.findOne({ _id: uuid, active });
    }

    async findByUsername(username: string, active = true): Promise<ProfileDocument | undefined > {
        return this.profileModel.findOne({ username, active });
    }
}