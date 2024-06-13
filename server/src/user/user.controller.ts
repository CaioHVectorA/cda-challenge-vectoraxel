import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { CurrentUserDto } from './dto/current-user-dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/user')
    @UseGuards(JwtAuthGuard)
    getPrivateData(@CurrentUser() user: CurrentUserDto) {
        return `${user.userId}, ${user.username}`
    }
}
