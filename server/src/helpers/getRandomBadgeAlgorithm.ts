import { Badge } from "@prisma/client"

const MAX_RARITY = 3
export function getRandomBadgeAlgorithm(badges: Badge[]) {
    const badgesArray = [] as Badge[]
    badges.forEach((badge) => {
        for (let i = 0; i < MAX_RARITY + 1 - badge.level; i++) {
            badgesArray.push(badge)
        }
    })
    return badgesArray[Math.floor(Math.random() * badgesArray.length)]
}