import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserDto } from '../user/dto/current-user-dto';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
    constructor(private readonly badgeService: BadgeService) {}

    
    @Post('/get-random')
    @UseGuards(JwtAuthGuard)
    getRandomBadge(@CurrentUser() user: CurrentUserDto) {
        return this.badgeService.getRandomBadge(user.userId)
    }
}
