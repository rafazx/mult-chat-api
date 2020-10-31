import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseMessages {
    @Field({
        nullable: false
    })
    text: string;

    @Field({
        nullable: false
    })
    nickName: string;

    @Field({
        nullable: false
    })
    roomName: string;
    
    @Field({
        nullable: false
    })
    createdAt: Date;
}