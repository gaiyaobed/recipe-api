import {
  CACHE_MANAGER,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma.service';
import { PasswordUtils } from './utils/password.utils';
import { LoginUserInput } from './dto/login-user.input';
import { User, UserResponse } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Islogout } from './jwt/islogout';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly passwordUtils: PasswordUtils,
    private readonly jwtService: JwtService,
    private readonly islogout: Islogout,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { name, password, email } = createUserInput;

    const findUser = await this.prisma.user.findUnique({ where: { email } });
    if (findUser) {
      throw new ConflictException('User exist');
    }
    const hashPassword = await this.passwordUtils.hashPassword(password);
    const data: any = { name, email, password: hashPassword };
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<UserResponse> {
    const { email, password } = loginUserInput;
    const findUser = await this.prisma.user.findUnique({ where: { email } });
    if (!findUser) {
      throw new ForbiddenException();
    }
    const passwordMatch = await this.passwordUtils.comparePassword(
      password,
      findUser.password,
    );
    if (!passwordMatch) {
      throw new ForbiddenException();
    }
    const payload = { sub: findUser.id };

    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      data: {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        password: findUser.password,
      },
    };
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser) {
      throw new NotFoundException();
    }
    return findUser;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return '';
  }

  async remove(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser) {
      throw new NotFoundException();
    }
    return await this.prisma.user.delete({ where: { id } });
  }

  async logOut(ctx: any): Promise<any> {
    await this.islogout.backlistToken(
      ctx.req.headers.authorization.replace('Bearer ', ''),
    );
    return ctx.req.user;
  }
}
