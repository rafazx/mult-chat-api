import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseUser {
    @Field({
        nullable: true
    })
    nickName: string
}