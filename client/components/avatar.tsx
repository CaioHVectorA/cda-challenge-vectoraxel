"use client"
import Avatar, { genConfig } from "react-nice-avatar";
import { Avatar as SrcAvatar, AvatarFallback as SrcAvatarFallback, AvatarImage as SrcAvatarImage } from '@/components/ui/avatar'
export function ProfileAvatar({ profile_picture, email, size='4rem' }: { profile_picture: string | null, email: string, size?: string }) {
    return (
        <>
            {profile_picture ? (
                <SrcAvatar className=" w-full h-full">
                    <SrcAvatarImage src={(`${process.env.NEXT_PUBLIC_API_URL}/${profile_picture}`) as string} alt="Profile Picture" />
                    <SrcAvatarFallback>{email[0]}</SrcAvatarFallback>
                </SrcAvatar>
            ) : <Avatar {...genConfig(email)} style={{ width: size, height: size }} />}
        </>
    )
}