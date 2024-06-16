"use client"
import axios, { AxiosError } from 'axios'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserSchema, UserSign } from "@/types/user.type"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { useRandomAcquire } from "@/lib/hooks/use-random-acquire"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { useApi } from '@/lib/hooks/use-api'
import { getCookie } from '@/lib/cookies'
import { toast } from '@/components/ui/use-toast'

const labelDicionary = {
    'email': 'Email',
    'password': 'Senha'
}
const placeholderDicionary = {
    'email': 'joaosilva@mail.com',
    'password': 'minhasenhaforte123'
}

export default () => {
    const { badge, imageUrl, message } = useRandomAcquire(3000)
    const { register, formState: { errors }, handleSubmit, watch } = useForm<UserSign>({ resolver: zodResolver(UserSchema) })
    const [mode, setMode] = useState('login')
    const { post, loading, error } = useApi()
    const onSubmit = async (data: UserSign) => {
        post(`${process.env.NEXT_PUBLIC_API_URL}/auth/${mode}`, data).then(response => {
            if (!response) return
            if (response.status === 200) {
                window.location.href = '/'
            }
        })
    }
    useEffect(() => {
        if (error) {
            toast({
                title: error.response?.data?.message || 'Ocorreu um erro inesperado',
                variant: 'destructive'
            })
        }
    }, [error])
    return (
        <main className=" grid md:grid-cols-2 py-6 px-8 h-screen">
            <div className=" h-full max-md:min-h-screen flex flex-col justify-center items-center gap-4">
                <h1 className=" text-main text-dis">Emblemas CDA</h1>
                <h3 className=" text-center">
                    {mode == 'login' ? 'Bem vindo de volta! Entre para continuar.' : 'Crie sua conta para começar a gerenciar seus emblemas!'}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className=" md:w-9/12 flex flex-col gap-4">
                    {['email', 'password'].map((field) => (
                        <div key={field}>
                            <Label htmlFor={field}>{labelDicionary[field as keyof typeof labelDicionary]}</Label>
                            <Input placeholder={placeholderDicionary[field as keyof typeof placeholderDicionary]} className=" !bg-transparent mt-1.5" id={field} type={field === 'password' ? 'password' : 'text'} {...register(field as keyof typeof labelDicionary)} />
                            {errors[field as keyof typeof labelDicionary] && <p className=" text-red-600 font-semibold mt-2 text-sm">{errors[field as keyof typeof labelDicionary]?.message}</p>}
                        </div>
                    ))}
                    <Button type="submit" className=" !bg-main">
                        {loading ? 'Carregando...' : mode == 'login' ? 'Entrar' : 'Cadastrar'}
                    </Button>
                </form>
                    {mode == 'login' ? <Button variant={'ghost'} onClick={() => setMode('register')}>Não tem uma conta?<u className=" ml-1">Criar uma agora</u></Button> : <Button variant={'ghost'} onClick={() => setMode('login')}>Já tem uma conta?<u className=" ml-1">Entrar agora</u></Button>}
            </div>
            <aside className="pt-6 rounded-lg bg-gray-500 flex flex-col gap-4 px-6 items-center bg-opacity-10">
                <h2 className=" w-7/12 text-center">Onde você gerencia seus emblemas do <span className=" text-main font-bold">Cidade Alta</span> e relembra <span className="text-main font-bold">suas conquistas</span></h2>
                <p>Garanta já o acesso ao seu dashboard do gerenciador de emblemas do CDA!</p>
                <Separator />
                <h3>
                    {message}
                </h3>
                <img src={imageUrl} alt="Emblema adquirido" className=" h-52" />
                <h2 className=" font-bold">{badge}</h2>
                <p className=" italic">O que está esperando para adquirir o seu também?</p>
            </aside>
        </main>
    )
}