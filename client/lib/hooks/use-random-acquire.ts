import { useEffect, useState } from "react";

const nicknames = [
    "JonGames",
    "Coringa",
    "MigGames",
    "LipeGamer",
    "BiaPlay",
    "GuiX",
    "DudaPro",
    "NandoGamer",
    "RafaGame",
    "LuluPlayer",
    "ZecaBoss",
    "TatiPro",
    "LeoPlayer",
    "JuGames",
    "TecaPlay",
    "BetoGamer",
    "NinaX",
    "MigPro",
    "MariPlay",
    "CrisGamer",
    "GabiGames",
    "BinhoPlayer"
]

const badges = [
    { id: 1, slug: "cda", name: "Cidade Alta", url: "https://cidadealtarp.com/imagens/challenge/cidade-alta.png" },
    { id: 2, slug: "cda-valley", name: "Cidade Alta Valley", url: "https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png" },
    { id: 3, slug: "policia", name: "Policia do Cidade Alta", url: "https://cidadealtarp.com/imagens/challenge/policia.png" },
    { id: 4, slug: "hospital", name: "Hospital do Cidade Alta", url: "https://cidadealtarp.com/imagens/challenge/hospital.png" },
    { id: 5, slug: "mecanica", name: "Mecânica do Cidade Alta", url: "https://cidadealtarp.com/imagens/challenge/mecanica.png" },
    { id: 6, slug: "taxi", name: "Taxi do Cidade Alta", url: "https://cidadealtarp.com/imagens/challenge/taxi.png" },
    { id: 7, slug: "curuja", name: "Coruja", url: "https://cidadealtarp.com/imagens/challenge/coruja.png" },
    { id: 8, slug: "hiena", name: "Hiena", url: "https://cidadealtarp.com/imagens/challenge/hiena.png" },
    { id: 9, slug: "gato", name: "Gato", url: "https://cidadealtarp.com/imagens/challenge/gato.png" },
    { id: 10, slug: "urso", name: "Urso", url: "https://cidadealtarp.com/imagens/challenge/urso.png" }
];
export function useRandomAcquire(timeout: number) {
    const [actualNickname, setActualNickname] = useState<{ message: string, imageUrl: string, badge: string }>(() => {
        const index = Math.floor(badges.length * Math.random())
        return {
            message: `${nicknames[Math.floor(Math.random() * nicknames.length)]}${Math.floor(Math.random() * 10000)} adquiriu um novo emblema!`,
            imageUrl: badges[index].url,
            badge: badges[index].name
        }
    })
    // setTimeout(() => {
    //     const index = Math.floor(badges.length * Math.random())
    //     setActualNickname({
    //         message: `${nicknames[Math.floor(Math.random() * nicknames.length)]}${Math.floor(Math.random() * 10000)} adquiriu um novo emblema!`,
    //         imageUrl: badges[index].url,
    //         badge: badges[index].name
    //     })
    // }, timeout)
    useEffect(() => {
        const interval = setInterval(() => {
            const index = Math.floor(badges.length * Math.random())
            setActualNickname({
                message: `${nicknames[Math.floor(Math.random() * nicknames.length)]}${Math.floor(Math.random() * 10000)} adquiriu um novo emblema!`,
                imageUrl: badges[index].url,
                badge: badges[index].name
            })
        }, timeout)
        return () => clearInterval(interval)
    })
    return actualNickname
}