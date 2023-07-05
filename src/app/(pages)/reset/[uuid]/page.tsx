"use client"
import React, {useState} from 'react'
import {useRouter} from "next/navigation"


const Reset = ({params:{uuid}}:{params:{uuid:string}}) => {
    const router = useRouter()
    const[password, setpassword] = useState("")
    const[confirm, setconfirm] = useState("")
    // this form will send up updating the user
    // and then redirecting them to the login page
    // by then they should already have their new password
    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // get the values to be send to the backend
        const sendvalue = {
            password,
            resetpasswordstring:uuid
        }
        // sending to backend now
        const response = await fetch("/api/resetpassword/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendvalue)
        })
        console.log(response)
        // reroute to the sigin page
        if(response.ok){
            router.push("/")
        }else{
            alert("illegal paramter, you are now allowed")
        }

    }
  return (
    <div>
        <p>{uuid}</p>
        <form onSubmit={handleFormSubmit}>
            <input placeholder='new password' onChange={(e)=>setpassword(e.target.value)}/>
            <input placeholder='confirmpassword' onChange={(e)=>setconfirm(e.target.value)}/>
            <button type='submit'>reset</button>
        </form>
    </div>
  )
}

export default Reset