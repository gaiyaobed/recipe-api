import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'email field (placeholder)' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'name field (placeholder)' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'password field (placeholder)' })
  @IsNotEmpty()
  password: string;
}
