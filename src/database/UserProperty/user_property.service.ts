import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { UserProperty, UserPropertyDocument } from './user_property.schema';

const DEFAULT_SELECT = {
  name: 1,
  value: 1,
  type: 1,
};

@Injectable()
export class UserPropertyService {
  constructor(
    @InjectModel(UserProperty.name)
    private propertyModel: Model<UserPropertyDocument>,
  ) {}

  /**
   * Method for get all user properties
   * @param {string}                  uuid user UUID
   * @param {Record<string, number>}  select object for select filter
   * @param {Record<string, unknown>} filter object for filtering query
   */
  async findAllUserProperties(
    uuid: string,
    select = DEFAULT_SELECT,
    filter = { user: Types.ObjectId(uuid) },
  ): Promise<UserPropertyDocument[]> {
    try {
      return await this.propertyModel.find(filter).select(select);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for get service properties
   * @param {strgin}                 uuid user UUID
   * @param {Record<string, number>} select object for select filter
   */
  async findAllServiceProperties(uuid: string, select = DEFAULT_SELECT) {
    try {
      const filter = {
        user: Types.ObjectId(uuid),
        serviceField: true,
      };
      return await this.findAllUserProperties(uuid, select, filter);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for get all user not property service
   * @param {string}                 uuid   user UUID
   * @param {Record<string, number>} select filter for select query
   */
  async findAllNotServiceProperties(uuid: string, select = DEFAULT_SELECT) {
    try {
      const filter = {
        user: Types.ObjectId(uuid),
        serviceField: false,
      };
      return await this.findAllUserProperties(uuid, select, filter);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for create user property
   * @param {string}                                   uuid user UUID
   * @param {string}                                   name name of porperty
   * @param {string | number | Record<string, unknown} value value of property
   */
  async create(
    uuid: string,
    name: string,
    value: string | number | Record<string, unknown>,
    serviceField = true,
  ) {
    try {
      const user = Types.ObjectId(uuid);
      const type = typeof value;
      const uniqName = `${user}_${name}`;
      const toCreate = { user, name, value, type, uniqName, serviceField };
      const createdProperty = new this.propertyModel(toCreate);
      return await createdProperty.save();
    } catch (error) {
      throw error;
    }
  }
}
