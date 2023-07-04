"use client"
import React, {useState, useEffect} from 'react'
import {signIn} from "next-auth/react"
interface userInt{
        name: string;
        email: string;
        password: string;
        image: string;
        maritalStatus: string;
}
const Signup = () => {
    const[btnactive, setbtnactive] = useState(false)
    const[submitted, setsubmitted] = useState(false)
    const[user, setusers] = useState<userInt>({
        name: "",
        email: "",
        password: "",
        image: "",
        maritalStatus: ""
        })
        // here, we make use of this effect to tract that user have perfectly entered the required input
        // then they can be able to submit the form
        useEffect(()=>{
            if(user.name.length > 1 && 
                user.email.length > 1 && 
                user.password.length > 1 && 
                user.image.length> 1 &&
                user.maritalStatus.length > 0
                ){
                    setbtnactive(true)
                }else{
                    setbtnactive(false)
                }
        },[user])

        // here, we submit the form to the backend for storage
        const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            try {
                const response = await fetch('/api/signin', {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                if(response.ok){
                    setsubmitted(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
  return (
    <div>
        {
            submitted ? <button onClick={()=>signIn()} style={{padding: 8, backgroundColor: "green", color: "white"}}>sign in</button>:
            <form onSubmit={handleSubmit} style={{width: 400, border: "1px solid black", padding: 7, display:"flex", flexDirection: "column", gap: 10}}>
            <input placeholder='name' type='text' onChange={(e)=>setusers((prev)=>({...prev, name:e.target.value}))}/>
            <input placeholder='email' type='text' onChange={(e)=>setusers((prev)=>({...prev, email:e.target.value}))}/>
            <input placeholder='password' type='text' onChange={(e)=>setusers((prev)=>({...prev, password:e.target.value}))}/>
            <input placeholder='image' type='text' onChange={(e)=>setusers((prev)=>({...prev, image:e.target.value}))}/>
            <input placeholder='maritalStatus' type='text' onChange={(e)=>setusers((prev)=>({...prev, maritalStatus:e.target.value}))}/>
            <button type='submit' disabled={btnactive?false:true} style={{
                padding: "2px",
                backgroundColor: btnactive? "green": "gray"
            }}>submit form</button>
        </form>
        }
        
    </div>
  )
}

export default Signup