import { Types } from 'mongoose';

export interface IUser {
  uuid?: Types.ObjectId;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  active?: string;
  registrationDate?: Date;
}
