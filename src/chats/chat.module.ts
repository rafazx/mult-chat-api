import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { MessagesSchema } from './models/messages.model';
import { RoomsSchema } from './models/room.model';
import { UsersSchema } from './models/user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Messages', schema: MessagesSchema },
    { name: 'Rooms', schema: RoomsSchema },
    { name: 'Users', schema: UsersSchema },
  ])],
  providers: [
      ChatService,
      ChatResolver
    ],
})
export class ChatModule {}
