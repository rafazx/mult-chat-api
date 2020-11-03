import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://multChat_User:adwuxObBrBY4tHm6@mult-chat.wufls.mongodb.net/multChatDb?retryWrites=true&w=majority')],
})
export class DatabaseModule {}
