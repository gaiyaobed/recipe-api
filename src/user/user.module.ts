import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { PasswordUtils } from './utils/password.utils';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategies';
import { Islogout } from './jwt/islogout';

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
    ConfigModule,
  ],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    PasswordUtils,
    JwtStrategy,
    Islogout,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class UserModule {}
