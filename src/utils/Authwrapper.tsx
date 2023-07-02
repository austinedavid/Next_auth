"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react"

const Authwrapper = ({children}: {children: React.ReactNode}) => {
  return (
   <SessionProvider>
      {children}
   </SessionProvider>
  )
}

export default Authwrapper