import { BadgesOfUser, PrismaClient, User } from "@prisma/client";
import { fakerPT_BR as faker, fakerPT_BR } from '@faker-js/faker'
import { getRandomBadgeAlgorithm } from "../src/helpers/getRandomBadgeAlgorithm";
const prisma = new PrismaClient()
const levels = [1,2,3]
const data = [
    { slug: 'cda', name: 'Cidade Alta', image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png' },
    { slug: 'cda-valley', name: 'Cidade Alta Valley', image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png' },
    { slug: 'policia', name: 'Policia do Cidade Alta', image: 'https://cidadealtarp.com/imagens/challenge/policia.png' },
    { slug: 'hospital', name: 'Hospital do Cidade Alta', image: 'https://cidadealtarp.com/imagens/challenge/hospital.png' },
    { slug: 'mecanica', name: 'Mecânica do Cidade Alta', image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png' },
    { slug: 'taxi', name: 'Taxi do Cidade Alta', image: 'https://cidadealtarp.com/imagens/challenge/taxi.png' },
    { slug: 'curuja', name: 'Coruja', image: 'https://cidadealtarp.com/imagens/challenge/coruja.png' },
    { slug: 'hiena', name: 'Hiena', image: 'https://cidadealtarp.com/imagens/challenge/hiena.png' },
    { slug: 'gato', name: 'Gato', image: 'https://cidadealtarp.com/imagens/challenge/gato.png' },
    {  slug: 'urso', name: 'Urso', image: 'https://cidadealtarp.com/imagens/challenge/urso.png' },
];

async function seed() {
    // This is a seed function that will populate the database with fake data
    // Dont use this in production, or you will lose all your data!
    await prisma.badge.deleteMany()
    await prisma.user.deleteMany()
    await prisma.badgesOfUser.deleteMany()
    await prisma.$connect()
    for (const badge of data) {
        for (const level of levels) {
            await prisma.badge.create({
                data: {
                    ...badge,
                    level,
                },
            });
    }
    }
    const usersPayload = Array.from({ length: 1000 }, () => ({
        email: faker.internet.email(),
        name: faker.person.firstName()+(10000 * Math.random()).toFixed(0),
        password: faker.internet.password(),
    }))
    await prisma.user.createMany({
        data: usersPayload,
        skipDuplicates: true
    });
    const users = await prisma.user.findMany()
    const badges = await prisma.badge.findMany()
    const badges_data = []
    users.forEach((user) => {
        const badgesRemaining = [...badges]
        for (let i = 0; i < 3; i++) {    
        const badge = getRandomBadgeAlgorithm(badges)
        // promises.push(prisma.badgesOfUser.create({
        //     data: {
        //         badgeId: badge.id,
        //         userId: user.id,
        //         badgeSlug: badge.slug
        //     },
        // }))
        if (!badge?.id || !user?.id) return
        badges_data.push({
            badgeId: badge.id,
            userId: user.id,
            badgeSlug: badge.slug,
            assignedAt: faker.date.past({ years: 1 }),
        })
        badgesRemaining.splice(badgesRemaining.indexOf(badge), 1)
        }
    })
    await prisma.badgesOfUser.createMany({ data: badges_data }) 
    // const { length } = await Promise.all(promises)
    // console.log(length)
}

seed().then(() => console.log('Banco de dados populado com sucesso!')).catch((error) => console.error('Erro ao popular o banco de dados: ', error)).finally(async () => await prisma.$disconnect())