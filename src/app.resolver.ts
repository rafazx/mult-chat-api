import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
    constructor(
    ) { }

    @Query(() => String)
    getHello() {
        return 'Service Running'
    }
}
