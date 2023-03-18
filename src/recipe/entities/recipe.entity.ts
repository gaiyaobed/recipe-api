import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Recipe {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => User, { nullable: true })
  user?: User;
}
