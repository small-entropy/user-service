import { IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import mongoose = require('mongoose');

import { User } from '../User/user.schema';

export type UserPropertyDocument = UserProperty & Document;

@Schema()
export class UserProperty {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ required: true })
  name: string;
  
  @IsNotEmpty()
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  value: mongoose.Schema.Types.Mixed;
  
  @Prop()
  @IsNotEmpty()
  type: string;

  @Prop({ required: true, unique: true, index: true })
  @IsNotEmpty()
  uniqName: string;

  @Prop({ required: true, default: true })
  serviceField: boolean;
}

export const UserPropertySchema = SchemaFactory.createForClass(UserProperty);
