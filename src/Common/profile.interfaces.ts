import { Types } from 'mongoose';

export interface IProfile {
  sex?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  description?: string;
  user?: Types.ObjectId;
}