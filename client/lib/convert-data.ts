export function ConvertDate(date: string) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
    const monthsDiff = Math.floor(daysDiff / 30);
    
    if (monthsDiff >= 2) {
        return `Há ${monthsDiff} meses`;
    } else if (monthsDiff === 1) {
        return `Há um mês`;
    } else if (daysDiff >= 2) {
        return `Há ${daysDiff} dias atrás`;
    } else if (daysDiff === 1) {
        return `Ontem`;
    } else if (hoursDiff >= 2) {
        return `Há ${hoursDiff} horas atrás`;
    } else if (hoursDiff === 1) {
        return `Há uma hora atrás`;
    } else if (minutesDiff >= 1) {
        return `Há ${minutesDiff} minutos atrás`;
    } else {
        return `Hoje`;
    }
}