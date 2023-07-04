import dbConnect from "@/utils/dbConnext";
import User from "@/utils/userModel";
import {uuid} from "uuidv4"
import {NextRequest} from "next/server"

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
    
}
