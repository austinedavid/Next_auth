import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!).then((res)=>{
            console.log("connection successful!!!")
        })
    } catch (error) {
        console.log(error)
    }
}
export default dbConnect