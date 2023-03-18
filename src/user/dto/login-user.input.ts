import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'email field (placeholder)' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'password field (placeholder)' })
  @IsNotEmpty()
  password: string;
}
