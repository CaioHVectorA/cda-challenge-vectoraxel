import { ProfileAvatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ConvertDate } from "@/lib/convert-data"
import { Badge } from "@/types/badges.type"
import { User } from "@/types/user.type"
import axios from "axios"
import { unstable_noStore as noStore } from 'next/cache'
import Link from "next/link"
export default async ({ params }: { params: { slug: string } }) => {
    // noStore()

    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/badge/users-by-badge-slug/${params.slug}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/badge/users-by-badge-slug/${params.slug}`, { cache: 'no-store' })
    const data = await response.json() as Array<{ badge: Badge, user: User & { assignedAt: string } }>
    if (data.length === 0) return (<h1>Nenhum usuário adquiriu este emblema ainda!</h1>)
    return (
        <div>
            <header className=" bg-blur fixed top-0 backdrop-blur-lg py-6 flex flex-col gap-2 w-full items-center pt-8 z-40">
                <h1 className=" text-center">Veja os {data.length} Usuários que adquiriram o emblema: {data[0].badge.name}</h1>
                <Button className=" mt-3 !bg-main" asChild>
                    <Link href={'/'}>
                        Voltar para o dashboard
                    </Link>
                </Button>
            </header>
            <section className=" w-6/12 mx-auto pt-40">
                <ul className=" flex flex-col gap-4 mt-4">
                    {data.sort((a, b) => (new Date(b.user.assignedAt).getTime()) - (new Date(a.user.assignedAt)).getTime()).map((item) => (
                        <li className=" grid-cols-[2fr,6fr,3fr,3fr] grid items-center justify-items-center">
                            <ProfileAvatar {...item.user}/>
                            <h1 className=" text-center">{item.user.name}</h1>
                            <p>{['Bronze', 'Prata', 'Ouro'][item.badge.level - 1]}</p>
                            <p>{ConvertDate(item.user.assignedAt)}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}