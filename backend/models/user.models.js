import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
         trim: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
         trim: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']

    }
},
    {
        timeStamp: true
    }

)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next() //if password field is not modified, skip hashing and proceed to next middleware or save operation.
//if password is modified (new user or password change), move to the next line to hash it
    this.password = await bcrypt.hash(this.password, 10); //The plain password becomes a hashed string.
})

export const User = mongoose.model("User", userSchema)