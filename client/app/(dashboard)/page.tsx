import axios from "axios"
import { cookies } from "next/headers"
import { Dashboard } from "./dashboard";
import { revalidateTag } from 'next/cache'
export default async () => {
  const session = cookies().get('session')?.value
  let data = null;
  if (session) data = (await axios(`${process.env.NEXT_PUBLIC_API_URL}/user/`, { headers: { Authorization: `Bearer ${session}` } } ).catch(err => {return null}))
    console.log({ data })
  if (data?.status === 404 || data?.status === 401) {
    data = null
  }  else {
    data = data?.data
  }
  return (
    <Dashboard data={data}/>
  )
}