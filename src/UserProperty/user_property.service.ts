import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { UserProperty, UserPropertyDocument } from './user_property.schema';

@Injectable()
export class UserPropertyService {
  constructor(
    @InjectModel(UserProperty.name)
    private propertyModel: Model<UserPropertyDocument>,
  ) {}

  async findAllUserProperties(
    uuid: string,
    select = {
      name: 1,
      value: 1,
      type: 1,
    },
  ): Promise<UserPropertyDocument[]> {
    return await this.propertyModel
      .find({ user: Types.ObjectId(uuid) })
      .select(select);
  }

  async create(
    uuid: string,
    name: string,
    value: string | number | Record<string, unknown>,
  ) {
    const user = Types.ObjectId(uuid);
    const type = typeof value;
    const uniqName = `${user}_${name}`;
    const toCreate = { user, name, value, type, uniqName };
    const createdProperty = new this.propertyModel(toCreate);
    return createdProperty.save();
  }
}
