import { useState } from "react";
import { getCookie } from "../cookies";
export const useAuth: () => {
    data: string | null;
    loading: boolean;
    getSession: () => string | null;
} = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    if (typeof document === "undefined") return { data, loading, getSession() {
        return null;
    }, };
    if (loading) {
        if (getCookie("session")) {
        setLoading(false)
        setData(getCookie("session") || null)
    } else {
        setLoading(false)
    }
    }
    const getSession = () => {
        return data || getCookie("session") || null;
    }
    return { data, loading, getSession };
}