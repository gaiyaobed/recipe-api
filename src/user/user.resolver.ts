import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserResponse } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { CurrentUser } from './jwt/auth-user';
import { JwtAuthGuard } from './jwt/gql-auth-guars';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => UserResponse, { name: 'login' })
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<UserResponse> {
    return await this.userService.login(loginUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id);
  }

  @Mutation(() => User, { name: 'logOut' })
  @UseGuards(JwtAuthGuard)
  async logOut(@Context() ctx: any): Promise<unknown> {
    return await this.userService.logOut(ctx);
  }
}
