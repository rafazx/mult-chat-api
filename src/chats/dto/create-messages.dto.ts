import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMessageDto {
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
}