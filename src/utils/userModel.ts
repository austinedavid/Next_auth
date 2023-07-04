import mongoose from "mongoose";

// creating a new user schema
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "the users name is required, please enter"]
    },
    email:{
        type:String,
        required: [true, "please your email is required"],
        unique: true
    },
    image:{
        type: String,
        unique: true
    },
    password: {
        type:String,
    },
    maritalStatus: {
        type:String
    },
    resetpasswordstring:{
        type:String,
        unique: true
    }
}, {timestamps: true})

// here we assign the mongoose model to the assignment constant
const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User