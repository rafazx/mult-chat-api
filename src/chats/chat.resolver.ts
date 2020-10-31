import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-messages.dto';
import { ResponseMessages } from './dto/messages.dto';
import { PubSub } from 'graphql-subscriptions'
import { ResponseRoom } from './dto/room.dto';

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

    @Subscription(() => ResponseMessages)
    messageAdded() {
      return pubSub.asyncIterator('messageAdded');
    }
}
