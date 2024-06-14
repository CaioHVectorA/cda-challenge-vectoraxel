import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { EditUserData } from './dto/edit-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    async register(payload: CreateUserDto): Promise<User> {
        const password = await bcrypt.hash(payload.password, 10)
        const data = { ...payload, password }
        const userExists = await this.prismaService.user.findFirst({ where: { email: payload.email } })
        if (userExists) throw new BadRequestException("Um usuário com esse email já existe!")
        const userCreated = await this.prismaService.user.create({ data })
        return userCreated
    }
    async edit(edit: EditUserData): Promise<boolean> {
        const { user_id, ...data } = edit
        const user = await this.prismaService.user.findUnique({ where: { id: user_id } })
        if (!user) throw new NotFoundException("Usuário não encontrado!")
        if (!data.name && !data.profile_picture) throw new BadRequestException("Nada para editar!")
        await this.prismaService.user.update({ where: { id: user_id }, data })
        return true
    }
    async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { email } })
    }
    async find(id: string) {
        if (!id) throw new BadRequestException("Usuário não encontrado!")
        const found = await this.prismaService.user.findUnique({ where: { id } })
        if (!found) throw new NotFoundException("Usuário não encontrado!")
        const { password, ...data } = found
        return data
    }
}
