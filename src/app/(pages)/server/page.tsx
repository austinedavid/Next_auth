import getSessions from '@/componets/Sessions'
import React from 'react'
import {redirect} from "next/navigation"


const Server = async() => {
 const session = await getSessions()
  /* it is import that note that the other field added the session will not show
  this is because the declared interface of sessions does not include those extrafield
  so, we created an interface to include the field in the nextauth route
  */ 
  return (
    <div>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <img src={session?.user?.image!} alt='lovings'/>
      <p>not working</p>
      <p>{session?.user?.password}</p>
      <p>{session?.user?.maritalStatus}</p>
      <p>{session?.user?._id}</p>
    </div>
  )
}

export default Server