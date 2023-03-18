import { CACHE_MANAGER, CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { PasswordUtils } from './utils/password.utils';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { JwtStrategy } from './jwt/jwt.strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          // expiresIn:'',
        },
      }),
    }),
    CacheModule.register<RedisClientOptions>({
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      inject: [CACHE_MANAGER],
    }),
    ConfigModule,
  ],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    PasswordUtils,
    JwtStrategy,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class UserModule {}
