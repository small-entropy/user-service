import { Types } from 'mongoose';

export interface IUser {
  uuid?: Types.ObjectId;
  username?: string;
  email?: string;
  password?: string;
  active?: boolean;
  registrationDate?: Date;
}
