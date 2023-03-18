import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@ObjectType()
export class UsersResponse {
  @Field(() => String)
  message: string;

  @Field(() => Int)
  statusCode: number;

  @Field(() => String)
  status: string;

  @Field(() => [User])
  data: User[];
}

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => User)
  data: User;
}
