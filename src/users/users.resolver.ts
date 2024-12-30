import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Public } from '../common/decorators/public.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getUsers' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<User[]> {
    return this.usersService.findAll({
      skip: skip,
      limit: limit,
    });
  }

  @Query(() => User, { nullable: true, name: 'getUserById' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User | null> {
    return this.usersService.findOne({ _id: id });
  }

  @Mutation(() => User, { nullable: true, name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<any> {
    return this.usersService.update({
      where: { _id: id },
      data: updateUserInput,
    });
  }

  @Mutation(() => User, { nullable: true, name: 'removeUser' })
  async removeUser(@Args('id', { type: () => ID }) id: string): Promise<any> {
    return this.usersService.remove({ _id: id });
  }
}
