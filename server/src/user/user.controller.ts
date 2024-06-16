import { BadRequestException, Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { CurrentUserDto } from './dto/current-user-dto';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserDto } from './dto/user-dto';
import { ResponseDto } from './dto/response-dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @ApiResponse({ status: 200, type: UserDto, isArray: false, description: 'Resposta com dados do usuário'})
    @ApiTags('user')
    @ApiBearerAuth()
    @Get('/')
    @UseGuards(JwtAuthGuard)
    getPrivateData(@CurrentUser() user: CurrentUserDto) {
        return this.userService.find(user.userId || null)
    }
    @Put('/edit-user-data')
    @ApiResponse({ status: 200, type: ResponseDto, isArray: false, description: 'Resposta com confirmação do sucesso'})
    @ApiTags('user')
    @ApiBearerAuth()
    @Get('/')
    @UseGuards(JwtAuthGuard)
    async editUserData(@CurrentUser() user: CurrentUserDto, @Body() body: { profile_picture?: string, name?: string }) {
        const sucess = await this.userService.edit({ ...body, user_id: user.userId })
        if (!sucess) throw new BadRequestException("Erro ao editar usuário!")
        return { message: "Usuário editado com sucesso!" }
    }
}
