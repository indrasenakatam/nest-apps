import { Args, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './users.model';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('userId') userId: string): Promise<User> {
    const user = this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(userId);
    }
    return user;
  }

  @Mutation(() => User)
  async addUser(
    @Args('newUserData') newUserData: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.create(newUserData);
    return user;
  }
}
