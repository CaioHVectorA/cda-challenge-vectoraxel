import { BadRequestException, Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { CurrentUserDto } from './dto/current-user-dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    @UseGuards(JwtAuthGuard)
    getPrivateData(@CurrentUser() user: CurrentUserDto) {
        return this.userService.find(user.userId || null)
    }
    @Put('/edit-user-data')
    @UseGuards(JwtAuthGuard)
    async editUserData(@CurrentUser() user: CurrentUserDto, @Body() body: { profile_picture?: string, name?: string }) {
        const sucess = await this.userService.edit({ ...body, user_id: user.userId })
        if (!sucess) throw new BadRequestException("Erro ao editar usuário!")
        return { message: "Usuário editado com sucesso!" }
    }
}
