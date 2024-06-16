import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { EditUserData } from './dto/edit-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { writeFile } from 'fs/promises' 
import { existsSync, mkdirSync } from 'fs';
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
        let profile_picture = user.profile_picture
        if (data.profile_picture) {
            const base64 = Buffer.from(data.profile_picture.replace(
                /^data:image\/(jpeg|png|jpg);base64,/, ''
            ), 'base64');
            if (!base64) throw new BadRequestException("Imagem inválida!")
            const profilePicturesFolder = process.cwd() + '/static/profile_pictures';
            if (!existsSync(profilePicturesFolder)) {
                mkdirSync(profilePicturesFolder);
            }
            await writeFile(`${profilePicturesFolder}/${user_id}.png`, base64)
            profile_picture = `/profile_pictures/${user_id}.png`
        }
        await this.prismaService.user.update({ where: { id: user_id }, data: { name: data.name, profile_picture }})
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
        const badges = await this.prismaService.badge.findMany({
            where: {
                BadgesOfUser: {
                    some: {
                        userId: id
                    }
                }
            }
        })
        return  { ...data, badges }
    }
}
