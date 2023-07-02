"use client"
import React from 'react'
import {signIn, signOut} from "next-auth/react"

const Logout = () => {
    const handleSignout = ()=>{
        signOut()
    }
  return (
    <div>
        <button onClick={handleSignout}>click-here-to-sign-out</button>
    </div>
  )
}

export default Logout