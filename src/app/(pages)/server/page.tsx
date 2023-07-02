import getSessions from '@/componets/Sessions'
import React from 'react'
import {redirect} from "next/navigation"

const Server = async() => {
  const session = await getSessions()
  if(session?.user){
    console.log(session.user)
  }
  return (
    <div>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <img src={session?.user?.image!} alt='lovings'/>
    </div>
  )
}

export default Server