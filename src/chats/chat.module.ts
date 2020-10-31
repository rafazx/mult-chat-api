import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { MessagesSchema } from './models/messages.model';
import { RoomsSchema } from './models/room.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Messages', schema: MessagesSchema },
    { name: 'Rooms', schema: RoomsSchema },
  ])],
  providers: [
      ChatService,
      ChatResolver
    ],
})
export class ChatModule {}
