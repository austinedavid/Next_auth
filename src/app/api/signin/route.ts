import {NextRequest, NextResponse} from "next/server"
import dbConnect from "@/utils/dbConnext"
import User from "@/utils/userModel"
import bcrypt from "bcryptjs"

dbConnect()
// here, we  make use of post method to create a user
export async function POST(request:NextRequest){
    const { password, ...others} = await request.json()
    
    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({...others, password:hashedPassword})
        const savedUser = await newUser.save()
        console.log(savedUser)
        return NextResponse.json(savedUser, {status:200})
    } catch (error) {
        return NextResponse.json({message: "something went wrong"}, {status: 500})
    }
}

