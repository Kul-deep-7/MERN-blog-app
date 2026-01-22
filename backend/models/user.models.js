
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
         trim: true
    },
    Username:{
        type: String,
        required: true,
        unique: true,
         trim: true
    },
    Password:{
        type: String,
        required: [true, 'Password is required']

    }
},
    {
        timeStamp: true
    }

)

userSchema.pre("save", async function(next) {
    if(!this.isModified("Password")) return next() //if password field is not modified, skip hashing and proceed to next middleware or save operation.
//if password is modified (new user or password change), move to the next line to hash it
    this.Password = await bcrypt.hash(this.Password, 10); //The plain password becomes a hashed string.
})

export const User = mongoose.model("User", userSchema)