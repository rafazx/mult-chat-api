import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-messages.dto';
import { MessagesDocument } from './models/messages.model';
import { RoomsDocument } from './models/room.model';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('Messages') private readonly messagesModel: Model<MessagesDocument>,
        @InjectModel('Rooms') private readonly roomsModel: Model<RoomsDocument>
    ) {}

    async createMessage(message: CreateMessageDto): Promise<any> {
        const room = await this.roomsModel.findOne({name: message.roomName});
        if(!room) {
            throw new BadRequestException('Não existe Sala com esse Nome');
        }
        const createdMessage = await this.messagesModel.create(message);
        if(!room.messages) {
            room.messages = []
        }
        room.messages.push(createdMessage);
        await room.save();
        return createdMessage
    }

    // async getAllMessages(): Promise<any[]> {
    //     return await this.messagesModel.find().sort({createdAt: 1});
    // }

    async getMessagesInRoom(roomName: string, page: number): Promise<any[]> {
        const messages = await this.messagesModel.find({roomName})
        .skip(page === 0 ? 0 : 2 * page)
        .limit(2)
        .sort({createdAt : 1})
        return messages
    }
}
