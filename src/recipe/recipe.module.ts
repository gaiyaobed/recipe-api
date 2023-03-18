import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';
import { PrismaService } from '../prisma.service';
import { Islogout } from '../user/jwt/islogout';

@Module({
  imports: [],
  providers: [RecipeResolver, RecipeService, PrismaService, Islogout],
})
export class RecipeModule {}
