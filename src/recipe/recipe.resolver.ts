import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/jwt/gql-auth-guars';
import { CurrentUser } from '../user/jwt/auth-user';
import { User } from '../user/entities/user.entity';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Mutation(() => Recipe)
  @UseGuards(JwtAuthGuard)
  async createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
    @CurrentUser() user: User,@Context() ctx: any

  ) {
    return await this.recipeService.create(createRecipeInput, user, ctx);
  }

  @Query(() => [Recipe], { name: 'recipes' })
  async findAll(): Promise<Recipe[]> {
    return await this.recipeService.findAll();
  }

  @Query(() => Recipe, { name: 'recipe' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recipeService.findOne(id);
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    return this.recipeService.update(updateRecipeInput.id, updateRecipeInput);
  }

  @Mutation(() => Recipe)
  removeRecipe(@Args('id', { type: () => Int }) id: number) {
    return this.recipeService.remove(id);
  }
}
