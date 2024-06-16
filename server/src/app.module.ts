import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { BadgeModule } from './badge/badge.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, JwtModule, BadgeModule, ServeStaticModule.forRoot({
    rootPath: process.env.NODE_ENV == 'dev' ? join(__dirname, '..', 'static') : join(__dirname, '..', '..', 'static')
  })],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService, PrismaService],
})
export class AppModule {}
