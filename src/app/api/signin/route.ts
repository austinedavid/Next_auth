import {NextRequest, NextResponse} from "next/server"
import dbConnect from "@/utils/dbConnext"
import User from "@/utils/userModel"
import bcrypt from "bcryptjs"

dbConnect()
// here, we  make use of post method to create a user
export async function POST(request:NextRequest){
    const {name, password, email} = await request.json()
    console.log(email)
    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({name, email, password:hashedPassword})
        const savedUser = await newUser.save()
        console.log(savedUser)
        return NextResponse.json(savedUser)
    } catch (error) {
        return NextResponse.json({message: "something bad happended"})
    }
}

