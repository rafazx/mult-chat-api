  
import { Messages } from './messages.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from './user.model';

export type RoomsDocument = Rooms & Document;

@Schema()
export class Rooms {
    @Prop({required: true, maxlength: 20, minlength: 5})
    name: string;
    
    @Prop()
    messages: Messages[];

    @Prop()
    users: Users[];
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);