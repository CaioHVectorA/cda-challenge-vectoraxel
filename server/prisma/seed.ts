import { PrismaClient } from "@prisma/client";

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
}

seed().then(() => console.log('Banco de dados populado com sucesso!')).catch((error) => console.error('Erro ao popular o banco de dados: ', error)).finally(async () => await prisma.$disconnect())