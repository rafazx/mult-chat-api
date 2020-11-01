import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({
    timestamps: true
})
export class Users {
  @Prop({required: true, maxlength: 20})
  nickName: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);