import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessagesDocument = Messages & Document;

@Schema({
    timestamps: true
})
export class Messages {
  @Prop({required: true, maxlength: 500})
  text: string;

  @Prop({required: true, maxlength: 20})
  nickName: string;
  
  @Prop({required: true, maxlength: 20})
  roomName: string;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);