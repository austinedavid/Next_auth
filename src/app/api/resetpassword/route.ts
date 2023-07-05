import dbConnect from "@/utils/dbConnext";
import User from "@/utils/userModel";
import {uuid} from "uuidv4"
import {NextRequest} from "next/server"
import Sendmail from "@/utils/Sendmail";
import bcrypt from "bcryptjs"

/*
here, we create a post route
this will serve as a method that will set the resetpasswordstring to our database
and also it will serve as the link to the nodemailer so we can send mail to the user
*/ 

export async function POST(request:NextRequest){
    dbConnect()
    const email = await request.json()
    // lets generate the unique string using the uuid package
    // we will run it twice so that the string can be very long and not hackable
    const uuid1 = uuid().replace(/[-]/g,"")
    const uuid2 = uuid().replace(/[-]/g,"")
    const joineduuid = uuid1.concat(uuid2)

    // here, we will check if the user exist in our database using their email
    const user = await User.findOne({email})
    // we will respond an error if the user do not exist
    if(!user)return new Response(JSON.stringify({message: "email not recognized"}), {status:500, statusText: "request not successful"})
    // then run the remaining code if it actually exist
    // here we call the function that will send the email to the user
    Sendmail(email, joineduuid)
    // here we will then store the uuid to the database using an update method
    const vals = await User.findByIdAndUpdate(user._id, {resetpasswordstring:joineduuid}, {new:true})
    console.log(vals)
    return new Response(JSON.stringify({message: "successfully submitted to database"}), {status:200, statusText: "successful"})
}

// here we make use of here to update our users password after submitting from the front end
export async function PUT(request:NextRequest){
    console.log("hello")
    dbConnect()
    const {password, resetpasswordstring} = await request.json()
    console.log("from front",resetpasswordstring)
    console.log("password", password)
    const hashedpassword = bcrypt.hashSync(password, 10)
    const user = await User.findOne({resetpasswordstring})
    if(!user) return new Response(JSON.stringify({message: "you are not allowed here"}), {status:500, statusText: "illegal crossing"})
    await User.findByIdAndUpdate(user._id, {password:hashedpassword}, {new:true})
    return new Response(JSON.stringify({message: "password successfully reseted"}), {status:200, statusText: "successfully set now"})
}
