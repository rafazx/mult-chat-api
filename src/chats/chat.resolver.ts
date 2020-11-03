import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-messages.dto';
import { ResponseMessages } from './dto/messages.dto';
import { PubSub } from 'graphql-subscriptions'
import { ResponseUser } from './dto/user.dto';
import { ResponseJoinedRoom } from './dto/response-joined-room';
import { ResponseRoom } from './dto/room.dto';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @Mutation(() => ResponseMessages)
    async sendMessage(
        @Args('message') message: CreateMessageDto
    ) {
        const messageAdded = await this.chatService.createMessage(message);
        pubSub.publish('messageAdded', { messageAdded });
        return messageAdded;
    }
    
    @Query(() => [ResponseMessages])
    getMessagesInRoom(
        @Args('roomName') roomName: string,
    ) {
        return this.chatService.getMessagesInRoom(roomName);
    }

    @Mutation(() => ResponseUser)
    async joinedRoom(
        @Args('nickName') nickName: string,
        @Args('roomName') roomName: string
    ) {
        const user = await this.chatService.joinedRoom(nickName, roomName);
        const userJoinedRoom =  { nickName : nickName, roomName: roomName };
        pubSub.publish('userJoinedRoom', { userJoinedRoom });
        return user
    }
        
    @Mutation(() => ResponseUser)
    async leaveRoom(
        @Args('nickName') nickName: string,
        @Args('roomName') roomName: string
    ) {
        const user = await this.chatService.leaveRoom(nickName, roomName);
        const userLeaveRoom =  { nickName : nickName, roomName: roomName };
        pubSub.publish('userLeaveRoom', { userLeaveRoom });
        return user;
    }

    @Mutation(() => ResponseUser)
    createUser(
        @Args('nickName') nickName: string,
    ) {
        return this.chatService.createUser(nickName);
    }

    @Query(() => [ResponseRoom])
    getAllRooms() {
        return this.chatService.getAllRooms();
    }

    @Subscription(() => ResponseMessages)
    messageAdded() {
      return pubSub.asyncIterator('messageAdded');
    }

    @Subscription(() => ResponseJoinedRoom)
    userJoinedRoom() {
      return pubSub.asyncIterator('userJoinedRoom');
    }

    @Subscription(() => ResponseJoinedRoom)
    userLeaveRoom() {
      return pubSub.asyncIterator('userLeaveRoom');
    }
}
