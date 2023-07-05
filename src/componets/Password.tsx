"use client"
import React, {useState} from 'react'
import {useRouter} from "next/navigation"

const Password = () => {
    const router = useRouter()
    const[send, setsent] = useState(false)
    const[email, setemail] = useState("")
    // using this to execute the function that will sent a link to the user and also change the UI
    const handleClicked = async()=>{
        const response = await fetch("/api/resetpassword/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        })
        if(response.ok){
            return setsent(true)
        }else{
            return alert("email does not exist in the database")
        }
    }
  return (
    <div>
        {
            send ? <p>please  check your email, a link is already sent there!!!</p>:
            <div>
                <p>enter your email and click on the send below</p>
                <input placeholder='enter email' required onChange={(e)=> setemail(e.target.value)}/>
                <button onClick={handleClicked}>send now</button>
            </div>
        }
        
    </div>
  )
}

export default Password