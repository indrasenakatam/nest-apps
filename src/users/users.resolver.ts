import { Args, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './users.model';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { Pagination, PaginationFilter } from 'src/query-filters/pagination';
import { SortingFilter } from 'src/query-filters/sorting';
import { FilteringParams, Filtering } from 'src/query-filters/params-filter';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(
    @Args({ name: 'pagination', type: () => PaginationFilter }) pagination?: PaginationFilter,
    @Args({name: 'sort', type: ()=> [SortingFilter]}) sort?: SortingFilter[]
  ): Promise<User[]> {
    return this.userService.findAll(pagination, sort);
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
