import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseMessages } from "./messages.dto";


@ObjectType()
export class Message {
    @Field({
        nullable: true
    })
    text: string

    @Field({
        nullable: true
    })
    nickName: string
    
    @Field({
        nullable: true
    })
    createdAt: Date
}

@ObjectType()
export class ResponseRoom {
    @Field(() => [Message], {
        nullable: true
    })
    messages: Message[]
}