import { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useAuth } from './use-auth';
type ResponseError = {
    message: string,
    status: number,
    error: string
}
export const useApi = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { data: session, getSession } = useAuth()
    const [response, setResponse] = useState<AxiosResponse | null>(null)
    const [error, setError] = useState<AxiosError<ResponseError>>()
    const get = async (url: string) => {
        setLoading(true)
        // const response = await axios.get(url, {
        //     headers: {
        //         Authorization: `Bearer ${session || getSession()}`
        //     }
        // })
        const promise = axios.get(url, {
            withCredentials: false, headers: {
                Authorization: `Bearer ${session || getSession()}`
            }
        })
        promise.catch(setError)
        const response = await promise
        setData(response.data)
        setResponse(response)
        setLoading(false)
        return response
    }
    const post = async (url: string, body: any) => {
        setLoading(true)
        try {
            console.log({ session, getSession: getSession() })
            const promise = axios.post(url, body, {
                withCredentials: false, headers: {
                    Authorization: `Bearer ${session || getSession()}`
                }
            })
            promise.catch(setError)
            const response = await promise
            setData(response.data)
            setResponse(response)
            if (response.data.acess_token) {
                document.cookie = `session=${response.data.acess_token}`
            }
            setLoading(false)
            return response
        } catch(err) {
            setError(err as AxiosError<ResponseError>)
            setLoading(false)
        }
    }
    const put = async (url: string, body: any) => {
        setLoading(true)
        // const response = await axios.put(url, body, { 
        //     headers: {
        //         Authorization: `Bearer ${session || getSession()}`
        //     }
        // })
        const promise = axios.put(url, body, {
            withCredentials: false, headers: {
                Authorization: `Bearer ${session || getSession()}`
            }
        })
        promise.catch(setError)
        const response = await promise
        setResponse(response)
        setData(response.data)
        setLoading(false)
        return response
    }
    const del = async (url: string) => {
        setLoading(true)
        // const response = await axios.delete(url, {
        //     headers: {
        //         Authorization: `Bearer ${session || getSession()}`
        //     }

        // })
        const promise = axios.delete(url, {
            withCredentials: false, headers: {
                Authorization: `Bearer ${session || getSession()}`
            }
        })
        promise.catch(setError)
        const response = await promise
        setResponse(response)
        setData(response.data)
        setLoading(false)
        return response
    }
    return { data, loading, get, post, put, del, response, error }
}