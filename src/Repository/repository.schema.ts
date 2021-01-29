import { IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

import { User } from '../Users/user.schema';

export type RepositoryDocument = Repository & Document;

@Schema()
export class Repository {
  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  reviewers: Types.ObjectId[];

  @IsNotEmpty()
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  team: Types.ObjectId[];

  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop({ required: true, unique: true, index: true })
  uniqName: string;

  @Prop()
  description: string;

  @Prop({ Type: Date, default: Date.now })
  created: Date;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ rqeuired: true, default: true })
  isPublic: boolean;


}

export const RepositorySchema = SchemaFactory.createForClass(Repository);
