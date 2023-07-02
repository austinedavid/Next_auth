"use client"
import React from 'react'
import {signIn, signOut} from "next-auth/react"

const HomeS = () => {
    const handleSignin = ()=>{
        signIn()
    }
  return (
    <div>
        <button onClick={handleSignin}>click-here-to-sign-in</button>
    </div>
  )
}

export default HomeS