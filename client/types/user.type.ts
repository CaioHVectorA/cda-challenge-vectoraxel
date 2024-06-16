import { z } from 'zod'
import { Badge } from './badges.type'


export const UserSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type UserSign = z.infer<typeof UserSchema>

export type User = {
    id: string,
    email: string,
    createdAt: string | Date,
    updatedAt: string | Date,
    name: string | null,
    profile_picture: string | null
    badges: Badge[]
}