import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;
  @Prop({ type: String, unique: true, required: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ required: true, default: true })
  active: boolean
  @Prop({ type: Date, default: Date.now })
  registerDate: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
