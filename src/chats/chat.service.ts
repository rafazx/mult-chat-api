import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-messages.dto';
import { Messages } from './interfaces/IMessages';
import { User } from './interfaces/IUser';
import { MessagesDocument } from './models/messages.model';
import { Rooms, RoomsDocument } from './models/room.model';
import { UsersDocument } from './models/user.model';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('Messages') private readonly messagesModel: Model<MessagesDocument>,
        @InjectModel('Rooms') private readonly roomsModel: Model<RoomsDocument>,
        @InjectModel('Users') private readonly usersModel: Model<UsersDocument>
    ) {}

    async createMessage(message: CreateMessageDto): Promise<Messages> {
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

    async getMessagesInRoom(roomName: string): Promise<Messages[]> {
        const messages = await this.messagesModel.find({roomName})
        .sort({createdAt : 1})
        return messages
    }

    async createUser(nickName: string): Promise<User> {
        const userExist = await this.usersModel.findOne({
            nickName
        });
        if(userExist) {
            return userExist
        }
        const user = await this.usersModel.create({
            nickName
        });
        return user
    }

    
    async joinedRoom(nickName: string, roomName: string): Promise<User> {
        const user = await this.usersModel.findOne({
            nickName
        });
        if(!user) {
            throw new BadRequestException('Usuário não existe');
        };
        const room = await this.roomsModel.updateOne({
            name: roomName
        }, {
            $push: {
                users: user
            }
        });
        if(room.nModified != 1) {
            throw new Error('Error ao inserir Usuário na sala');
        }
        return user;
    }

    async getAllRooms(): Promise<Rooms[]> {
        return await this.roomsModel.find();
    }

    async leaveRoom(nickName: string, roomName: string): Promise<User> {
        const user = await this.usersModel.findOne({
            nickName
        });
        if(!user) {
            throw new BadRequestException('Usuário não existe');
        }
        const room = await this.roomsModel.findOne({name: roomName});
        if(!room) {
            throw new BadRequestException('Sala não existe');
        }
        let i;
        room.users.filter((e, index) => {
            if(e.nickName === nickName) {
              i = index  
            }
        });
        delete room.users[i];
        await room.save();
        return user;
    }
}
