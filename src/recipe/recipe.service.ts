import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { PrismaService } from '../prisma.service';
import { Recipe } from './entities/recipe.entity';
import { User } from '../user/entities/user.entity';
import { Islogout } from '../user/jwt/islogout';

@Injectable()
export class RecipeService {
  constructor(
    private prisma: PrismaService,
    private readonly islogout: Islogout,
  ) {}

  async create(createRecipeInput: CreateRecipeInput, user: User, ctx: any) {
    const { name } = createRecipeInput;
    // console.log(ctx.req.headers.authorization.replace('Bearer ', ''));
    // const backlisted = await this.islogout.isTokenBackListed(
    //   ctx.req.headers.authorization.replace('Bearer ', ''),
    // );

    const findRecipe: any = await this.prisma.recipe.findUnique({
      where: { name },
    });
    if (findRecipe) {
      throw new ConflictException('Already exist');
    }
    const data = { name, userId: user.id };
    return this.prisma.recipe.create({ data });
  }

  async findAll(): Promise<Recipe[]> {
    return await this.prisma.recipe.findMany({ include: { user: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeInput: UpdateRecipeInput) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
