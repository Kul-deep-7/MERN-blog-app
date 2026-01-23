
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
         trim: true,
         lowercase: true
    },
    Username:{
        type: String,
        required: true,
        unique: true,
         trim: true,
         lowercase: true
    },
    Password:{
        type: String,
        required: [true, 'Password is required']

    },
    refreshToken: {
            type: String
    }
},
    {
        timeStamp: true
    }

)

userSchema.pre("save", async function() {
    if(!this.isModified("Password")) { return; } //if password field is not modified, skip hashing and proceed to next middleware or save operation.
//if password is modified (new user or password change), move to the next line to hash it
    this.Password = await bcrypt.hash(this.Password, 10); //The plain password becomes a hashed string.
    return;
})

userSchema.methods.isPasswordCorrect = async function (Password) {
   return await bcrypt.compare(Password, this.Password); //password → plain text password entered by the user (login). this.password → hashed password stored in the database
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            //payload name: value from the database
        },
        process.env.ACCESS_TOKEN_SECRET, //secret key to sign the token or password
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,//instruction 
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)