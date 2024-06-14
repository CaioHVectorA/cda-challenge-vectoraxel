import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getRandomBadgeAlgorithm } from 'src/helpers/getRandomBadgeAlgorithm';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BadgeService {
    constructor(private readonly prismaService: PrismaService) {}
    async getRandomBadge(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) throw new NotFoundException('Usuário não encontrado')
        const badges = await this.prismaService.badge.findMany({
            where: {
                BadgesOfUser: {
                    none: {
                        userId
                    }
                }
            }
        })
        if (badges.length === 0) throw new BadRequestException('O usuário já possui todos os emblemas!')
        const badgeAcquired = getRandomBadgeAlgorithm(badges)
        await this.prismaService.badgesOfUser.create({
            data: {
                badgeId: badgeAcquired.id,
                userId 
            }
        })
        return badgeAcquired
    }
    
}
