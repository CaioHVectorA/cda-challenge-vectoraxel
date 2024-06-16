"use client"
import { User } from "@/types/user.type";
import { UserDashboard } from "@/components/user-dashboard";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApi } from "@/lib/hooks/use-api";
import { AlertDialog, AlertDialogAction, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/types/badges.type";
import { set } from "zod";
import { toast } from "@/components/ui/use-toast";
export function Dashboard({data}: {data: User | null}) {
    const { post, loading, error, response } = useApi()
    const [badges, setBadges] = useState<Badge[]>(data?.badges || [])
    const [modalData, setModalData] = useState<Badge | null>(null)
    if (!data) {
        if (typeof window === 'undefined') return <></>
        window.location.href = '/entrar'
        return <>Você está sendo redirecionado...</>
    }
    const handleGetRandomBadge = useCallback(async () => {
        const data = await post(`${process.env.NEXT_PUBLIC_API_URL}/badge/get-random`, {})
        if (!data) return
        console.log({ data })
        setModalData(data.data as Badge)
        setBadges(prevState => ([...prevState, data.data as Badge]))
    }, [])
    useEffect(() => {
        if (error) {
            toast({
                title: 'Você já tem todos os emblemas!',
            })
        }
    }, [error])
    return (
        <div className=" mt-8 mx-6">
            <h1>Bem vindo de volta!</h1>
            <p>Qual emblema você acha que consegue hoje?</p>
            <UserDashboard {...data} />
            <Separator className=" my-4"/>
            <section className=" min-h-48">
                <h2>Seus emblemas</h2>
                {badges.length === 0 ? <p className=" mt-3">Que pena! Você ainda não tem emblemas. <Link className=" underline font-semibold" href={'#acquire'}>Por que não adquirir um agora?</Link></p> : (
                    <ul className=" mt-4 flex gap-4 flex-wrap w-8/12">
                        {badges.sort((a, b) => b.level - a.level).map((badge) => (
                            <li key={badge.id} className=" w-24 h-24 p-5 rounded-full border-4 bg-bg-blue-700" 
                            style={{ borderColor: badge.level === 3 ? '#ffc046' : badge.level === 2 ? '#c0c0c0' : '#CD7F32' }}
                            >
                                <HoverCard openDelay={100} closeDelay={100}>
                                    <HoverCardTrigger className=" w-full h-full flex items-center justify-center" href={`/badges/${badge.slug}`}>
                                        {/* <Link href={`/badges/${badge.slug}`} className=""> */}
                                            <img src={badge.image} className=" object-contain" alt={badge.name} />
                                        {/* </Link> */}
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <h3 className=" text-base">{badge.name} - {['Bronze', 'Prata', 'Ouro'][badge.level - 1]}</h3>
                                        <p className=" text-sm opacity-70">Clique na imagem para ver quem também tem esse emblema!</p>
                                    </HoverCardContent>
                                </HoverCard>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <Separator className=" my-4"/>
            <section id="acquire" className=" flex flex-col w-4/12 gap-6 pb-12">
                <h2>O que está esperando? Clique no botão e adquira seu emblema agora.</h2>
                <p>Será que você consegue um <span className=" text-main">emblema ouro?</span></p>
                <Button onClick={handleGetRandomBadge} className=" !bg-main !w-40">Adquirir emblema</Button>
            </section>
            <AlertDialog open={!!(modalData)} onOpenChange={(open) => { if (!open){setModalData(null)} }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Parabéns! Você adquiriu um novo emblema!</AlertDialogTitle>
                        <AlertDialogDescription>{modalData?.name} <strong className={modalData?.level == 3 ? ' text-main' : ''}>{['Bronze', 'Prata', 'Ouro'][(modalData?.level ?? 1) - 1]}</strong></AlertDialogDescription>
                        <img className=" max-h-72 object-contain my-4" src={modalData?.image} alt={modalData?.name} />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setModalData(null)}>Fechar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleGetRandomBadge}>Adquirir outro</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}