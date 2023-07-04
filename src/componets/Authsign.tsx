"use client"
import React, {useState} from 'react'
import {signIn} from "next-auth/react"
import Link from 'next/link'
import {useSearchParams} from "next/navigation"

const Authsign = () => {
    const[credentail, setcredential] = useState({
        email:"",
        password: ""
    })
    // login using the credentail method here
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        signIn("credentials", credentail)
    }
    // login using the Oauth method here
    const handleOauthLogin = ()=>{
        signIn("github")
    }
  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <input placeholder='enter email' type='email' required onChange={(e)=>setcredential((prev)=>({...prev, email:e.target.value}))}/>
            <input placeholder='password' type='password' required onChange={(e)=>setcredential((prev)=>({...prev, password: e.target.value}))}/>
            <button type='submit'>submit</button>
        </form>
        <button onClick={handleOauthLogin}>login with Github</button>
        <p>have you forgotten your password: click <Link href="/getpassword">here</Link></p>
    </div>
  )
}

export default Authsign