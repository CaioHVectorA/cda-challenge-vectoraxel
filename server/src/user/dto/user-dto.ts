import { ApiProperty } from "@nestjs/swagger";
import { Badge } from "@prisma/client";
export class BadgeDTO {
    @ApiProperty()
    slug: string
    @ApiProperty()
    image: string
    @ApiProperty({ type: Number })
    id: number
    @ApiProperty()
    name: string
    @ApiProperty({ type: Number })
    level: number
}

export class UserDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    name?: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    profile_picture?: string
    @ApiProperty({ isArray: true, type: BadgeDTO })
    badges: Badge
}

export class GetAllUserByBadgeSlugDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;
    @ApiProperty({ type: BadgeDTO })
    badge: BadgeDTO;
}