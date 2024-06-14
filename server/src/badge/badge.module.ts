import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService, PrismaService]
})
export class BadgeModule {}
