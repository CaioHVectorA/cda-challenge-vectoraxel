import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { EditUserData } from './dto/edit-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    // async login(data: LoginUserDto): Promise<string> {

    // }
    async register(payload: CreateUserDto): Promise<User> {
        const password = await bcrypt.hash(payload.password, 10)
        const data = { ...payload, password }
        const userExists = await this.prismaService.user.findFirst({ where: { email: payload.email } })
        if (userExists) throw new BadRequestException("Um usuário com esse email já existe!")
        const userCreated = await this.prismaService.user.create({ data })
        return userCreated
    }
    // async edit(edit: EditUserData): Promise<boolean> {}
    // async adquireBadge(token: string) {}
    async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } })
    }
}
