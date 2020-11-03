import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseJoinedRoom {
    @Field({
        nullable: true
    })
    nickName: string

    @Field({
        nullable: true
    })
    roomName: string
}