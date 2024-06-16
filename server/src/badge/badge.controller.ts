import { Controller, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserDto } from '../user/dto/current-user-dto';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { BadgeService } from './badge.service';
import { BadgeDTO, GetAllUserByBadgeSlugDto } from 'src/user/dto/user-dto';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('badge')
export class BadgeController {
    constructor(private readonly badgeService: BadgeService) { }

    @ApiResponse({ status: 200, type: BadgeDTO, isArray: false, description: 'Resposta com o emblema obtido' })
    @ApiTags('badge')
    @ApiBearerAuth()
    @Post('/get-random')
    @UseGuards(JwtAuthGuard)
    getRandomBadge(@CurrentUser() user: CurrentUserDto) {
        return this.badgeService.getRandomBadge(user.userId)
    }
    @ApiResponse({ status: 200, type: GetAllUserByBadgeSlugDto, isArray: true, description: 'Resposta com todos os usuários que possuem um emblema com o slug dado' })
    @ApiTags('badge')
    @ApiBearerAuth()
    @Get('/users-by-badge-slug/:slug')
    getUsersByBadgeSlug(@Param('slug') slug: string, @Query('page') page: number = 1) {
        return this.badgeService.getUsersByBadgeSlug(slug, page)
    }
}
