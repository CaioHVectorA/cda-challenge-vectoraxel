import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/user/dto/login-user-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto, @Res() res: Response) {
    const user =  await this.authService.validateUser(signInDto.email, signInDto.password);
    if (!user) throw new UnauthorizedException("Credenciais inválidas!")
    const jwt = await this.authService.login(user)
    res.cookie('session', jwt.access_token, { httpOnly: true })
    return res.status(200).json({ status: "Sucess", message: 'Authenticated' })
  }
  @Post('register')
  async signUp(@Body() SignUpDto: CreateUserDto, @Res() res: Response) {
    const jwt = await this.authService.register(SignUpDto)
    res.cookie('session', jwt.access_token, { httpOnly: true })
    return res.status(200).json({ status: "Sucess", message: 'Authenticated' })
  }
}