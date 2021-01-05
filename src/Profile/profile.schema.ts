import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../Users/user.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
    @Prop({ enum: ['male', 'female', 'other'] })
    sex: string;
    @Prop()
    firstName: string;
    @Prop()
    middleName: string;
    @Prop()
    lastName: string;
    @Prop()
    description: string;
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);