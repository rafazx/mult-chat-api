import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-messages.dto';
import { ResponseMessages } from './dto/messages.dto';
import { PubSub } from 'graphql-subscriptions'
import { ResponseUser } from './dto/user.dto';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @Mutation(() => ResponseMessages)
    sendMessage(
        @Args('message') message: CreateMessageDto
    ) {
        const messageAdded = this.chatService.createMessage(message);
        pubSub.publish('messageAdded', { messageAdded });
        return messageAdded;
    }

    // @Query(() => [ResponseMessages])
    // getMessages() {
    //     return this.chatService.getAllMessages();
    // }

    
    @Query(() => [ResponseMessages])
    getMessagesInRoom(
        @Args('roomName') roomName: string,
        @Args('page') page: number
    ) {
        return this.chatService.getMessagesInRoom(roomName, page);
    }

    @Query(() => ResponseUser)
    joinedRoom(
        @Args('nickName') nickName: string,
        @Args('roomName') roomName: string
    ) {
        const user = this.chatService.joinedRoom(nickName, roomName);
        pubSub.publish('userJoinedRoom', { user });
        return user
    }
        
    @Query(() => ResponseUser)
    leaveRoom(
        @Args('nickName') nickName: string,
        @Args('roomName') roomName: string
    ) {
        return this.chatService.leaveRoom(nickName, roomName);
    }

    @Mutation(() => ResponseUser)
    createUser(
        @Args('nickName') nickName: string,
    ) {
        return this.chatService.createUser(nickName);
    }

    @Subscription(() => ResponseMessages)
    messageAdded() {
      return pubSub.asyncIterator('messageAdded');
    }

    @Subscription(() => ResponseUser)
    userJoinedRoom() {
      return pubSub.asyncIterator('userJoinedRoom');
    }
}
