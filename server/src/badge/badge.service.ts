import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { getRandomBadgeAlgorithm } from 'src/helpers/getRandomBadgeAlgorithm';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BadgeService {
    constructor(private readonly prismaService: PrismaService) { }
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
                userId,
                badgeSlug: badgeAcquired.slug
            }
        })
        return badgeAcquired
    }
    async getUsersByBadgeSlug(slug: string, page: number = 1) {
        const users = await this.prismaService.user.findMany({
            where: {
                BadgesOfUser: {
                    some: {
                        badgeSlug: slug
                    }
                }
            },
            select: {
                name: true,
                profile_picture: true,
                email: true,
                BadgesOfUser: { select: { assignedAt: true, Badge: true }, where: { badgeSlug: slug } }
            },
            skip: (page - 1) * 50,
            take: 50
        })
        return users.map((user) => ({
            user: {
                name: user.name,
                email: user.email,
                profile_picture: user.profile_picture,
                assignedAt: user.BadgesOfUser[0].assignedAt
            },
            badge: user.BadgesOfUser[0].Badge
        })).sort((a, b) => (new Date(b.user.assignedAt).getTime()) - (new Date(a.user.assignedAt)).getTime())
    }
}
