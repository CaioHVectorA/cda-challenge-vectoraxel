import { User } from "@/types/user.type";
import { CameraIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Avatar, { genConfig } from "react-nice-avatar";
import { Avatar as SrcAvatar, AvatarFallback as SrcAvatarFallback, AvatarImage as SrcAvatarImage } from '@/components/ui/avatar'
import { useState } from "react";
import { Button } from "./ui/button";
import { useApi } from "@/lib/hooks/use-api";
import { toast } from "./ui/use-toast";
import { useAuth } from "@/lib/hooks/use-auth";

export function UserDashboard(data: User) {
    const [srcData, setSrcData] = useState<string | null>(null);
    const [name, setName] = useState<string>(data?.name || '');
    const { put, loading, data: responseData } = useApi()
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                await put(`${process.env.NEXT_PUBLIC_API_URL}/user/edit-user-data`, { profile_picture: base64String })
                toast({
                    title: '✅ Imagem carregada!',
                    variant: 'default' 
                })
                setSrcData(base64String)
                // TODO: Handle base64 string
            };
            reader.readAsDataURL(selectedFile);
            // TODO: Handle file upload or processing
        }
    };
    return (
        <main className=" mt-20 mx-6 flex-col flex">
        <Label htmlFor="file" className=" relative group h-24 w-24 rounded-full">
        <div className=" absolute top-0 cursor-pointer w-24 rounded-full h-24 hidden group-hover:flex items-center justify-center bg-black bg-opacity-60 z-20">
            <CameraIcon size={32}/>
        </div>
        {(srcData || data.profile_picture) ? (
            <SrcAvatar className=" w-full h-full">
                <SrcAvatarImage src={(srcData || `${process.env.NEXT_PUBLIC_API_URL}/${data.profile_picture}`) as string} alt="Profile Picture" />
                <SrcAvatarFallback>{data.name?.[0]}</SrcAvatarFallback>
            </SrcAvatar>
            // <Ava src={data.profile_picture} alt="Profile Picture" />
            ) : <Avatar {...genConfig(data.email)} className=" w-24 h-24 "/>}
        </Label>
        <Input onChange={handleFileChange} type="file" accept="
        image/png, image/jpeg, image/jpg
        " className=" hidden mb-4" aria-hidden id="file"/>
        <Label className=" mt-6">Como podemos te chamar?</Label>
        <div className=" w-6/12 grid grid-cols-2 align-items-center gap-4 mt-2">
                <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" !bg-transparent"
                placeholder="João Silva"
                onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        if (loading) return
                        await put(`${process.env.NEXT_PUBLIC_API_URL}/user/edit-user-data`, { name })
                        toast({
                            title: '✅ Nome atualizado!',
                            variant: 'default' 
                        })
                    }
                }}
                />
            <Button
            className=" !bg-main" onClick={async () => {
                await put(`${process.env.NEXT_PUBLIC_API_URL}/user/edit-user-data`, { name })
                toast({
                    title: '✅ Nome atualizado!',
                    variant: 'default' 
                })
            }}>Salvar</Button>
        </div>
        </main>
    )
}