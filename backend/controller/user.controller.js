import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.models.js"

const signupUser = asyncHandler(async(req,res)=>{

    const{name,password,username}=req.body

     if (
            [fullName, email, username, password].some( //The .some() method returns true if at least one element in an array satisfies a condition.
                (field) => {
                    //console.log("Checking field:", field) -> for debugging and checking using postman
                    return field?.trim() === ""}//cb function.. field means 1 value at a time.
             )//field?.trim():  ?. (optional chaining) prevents error if field is null or undefined. "Is this field empty after removing spaces"
            ) {//Optional chaining (?.) allows safe access to a property or method of an object that may be null or undefined, without throwing an error.
                throw new ApiError(400, "All fields are required")
                console.log(field)
            }

    const existedUser = await User.findOne({username})

    if (existedUser) {
    console.log("User already exists:", existedUser)
    throw new ApiError(409, "User with username already exists")
    }

    const user = await User.create({ //creates a mongodb User document..
        name, //Comes from frontend. Stored as-is.
        username: username.toLowerCase(),
        password
    })//creating user in db

    const createdUser = await User.findById(user._id).select( //.select() is used when fetching data from MongoDB to decide:which fields you WANT(no -) & which fields you DON’T want(prefix with -)
    "-password -refreshToken" )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully"))

})