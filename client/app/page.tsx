import axios from "axios"
import { cookies } from "next/headers"

export default async () => {
  const session = cookies().get('session')?.value
  let data = null;
  if (session) data = (await axios(`${process.env.NEXT_PUBLIC_API_URL}/user/`, { headers: { Authorization: `Bearer ${session}` } } )).data  
  return (
    <>{JSON.stringify({ data })}</>
  )
}