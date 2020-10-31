import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { ChatModule } from './chats/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
      installSubscriptionHandlers: true
   }),
   ChatModule
  ],
  providers: [
    AppService,
    AppResolver
  ],
})
export class AppModule {}
