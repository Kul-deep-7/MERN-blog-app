import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js"

const signupUser = asyncHandler(async(req,res)=>{

     console.log("=== BACKEND DEBUG: SIGNUP START ===");
    console.log("Full request body:", req.body);
    console.log("Request body keys:", Object.keys(req.body));
    console.log("Request headers content-type:", req.headers['content-type']);
    
    const {Name, Username, Password} = req.body

    console.log("After destructuring:");
    console.log("name:", Name, "type:", typeof Name);
    console.log("username:", Username, "type:", typeof Username);
    console.log("password:", Password, "type:", typeof Password);

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

    const existedUser = await User.findOne({Username})

    if (existedUser) {
    console.log("User already exists:", existedUser)
    throw new ApiError(409, "User with username already exists")
    }

    const user = await User.create({ //creates a mongodb User document..
        Name, //Comes from frontend. Stored as-is.
        Username,
        Password
    })//creating user in db

    const createdUser = await User.findById(user._id).select( //.select() is used when fetching data from MongoDB to decide:which fields you WANT(no -) & which fields you DON’T want(prefix with -)
    "-password" )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
    new ApiResponse(200, createdUser, "User registered successfully"))

})

export {signupUser}