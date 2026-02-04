import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async(userId)=> {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found while generating tokens")
        }

        const accessToken =user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        //console.log(process.env.ACCESS_TOKEN_SECRET)

        return {accessToken, refreshToken}
        } catch (error) {
            console.log("TOKEN GENERATION ERROR:", error)
            throw new ApiError(500, "Could not generate tokens")
    }
}

const signupUser = asyncHandler(async(req,res)=>{

    // console.log("=== BACKEND DEBUG: SIGNUP START ===");
    // console.log("Full request body:", req.body);
    // console.log("Request body keys:", Object.keys(req.body));
    // console.log("Request headers content-type:", req.headers['content-type']);
    
    const {Name, Username, Password} = req.body

    // console.log("After destructuring:");
    // console.log("name:", Name, "type:", typeof Name);
    // console.log("username:", Username, "type:", typeof Username);
    // console.log("password:", Password, "type:", typeof Password);

     if (
            [Name, Username, Password].some( //The .some() method returns true if at least one element in an array satisfies a condition.
                (field) => {
                    //console.log("Checking field:", field) -> for debugging and checking using postman
                    return field?.trim() === ""}//cb function.. field means 1 value at a time.
             )//field?.trim():  ?. (optional chaining) prevents error if field is null or undefined. "Is this field empty after removing spaces"
            ) {//Optional chaining (?.) allows safe access to a property or method of an object that may be null or undefined, without throwing an error.
                throw new ApiError(400, "All fields are required")
                console.log(field)
            }

    if (Password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long")
}

    const existedUser = await User.findOne({Username})

    if (existedUser) {
    //console.log("User already exists:", existedUser) //shows me details of existed user
    throw new ApiError(409, "User with username already exists")
    }

    const user = await User.create({ //creates a mongodb User document..
        Name, //Comes from frontend. Stored as-is.
        Username,
        Password
    })//creating user in db

    const createdUser = await User.findById(user._id).select( //.select() is used when fetching data from MongoDB to decide:which fields you WANT(no -) & which fields you DON’T want(prefix with -)
    "-Password -refreshToken" )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
    new ApiResponse(200, createdUser, "User registered successfully"))

})

const loginUser = asyncHandler(async(req,res)=>{
/* 
// Request body -> contains login credentials
// Accept login via username
// Find the user in the database
// Verify the password
// Generate access and refresh tokens
// Send tokens back as cookies
*/

//console.log("BODY =>", req.body)

const{Username, Password}=req.body

if(!(Username)){
    throw new ApiError(400, "username required")
}

const user = await User.findOne({Username}) 

if(!user){
    throw new ApiError(404, "username does not exists")
}

const isPasswordValid = await user.isPasswordCorrect(Password) //isPasswordCorrect() is an instance method 


if(!isPasswordValid){
    throw new ApiError(401, "invalid user credentials")
}

const {refreshToken, accessToken}= await generateAccessAndRefreshTokens(user._id) 

const loggedInUser = await User.findById(user._id)
.select("-Password -refreshToken")

const options = {
    httpOnly: true, 
    secure: true, //true in production & false in development
    sameSite: "none" 
}


// console.log("🔐 About to set cookies:")
// console.log("accessToken:", accessToken?.substring(0, 20) + "...")
// console.log("refreshToken:", refreshToken?.substring(0, 20) + "...")
// console.log("options:", options)

return res
.status(200)
.cookie("accessToken", accessToken, options) 
.cookie("refreshToken", refreshToken,options) 
.json(
    new ApiResponse(200,{
        user: loggedInUser, accessToken, refreshToken //sending tokens in response body is optional as we are sending them as httpOnly cookies
    },"user logged in successfullly"
)
)


})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
         {
            $set:{
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

     const options = {
    httpOnly: true, 
    secure: true,
    sameSite: "none", 
}

    return res
    .status(200)
    .clearCookie("accessToken", options) //we stored accessToken in key value pairs in login controller here we only need key
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged out successfully"))

})
   

const getMe = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,{
            user: req.user
        })
    )
})

export {signupUser, loginUser, logoutUser, getMe}