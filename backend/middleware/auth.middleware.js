import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        console.log("Auth middleware called");
        
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "");
        
        //console.log("Token found:", !!token);

        if (!token) {
            //console.log(" No token provided");
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);//when we signed the access token key in user.models using (jwt.sign()... we had the secret in it.. wwe should add the same secret key here to verify)
        //console.log("Token verified for user ID:", decodedToken._id);
         /* 
    jwt.verify() validates the authenticity and expiry of a JWT using the secret key and returns the decoded payload if the token is valid.
    jwt.sign() = create identity proof
    jwt.verify() = check identity proof
    */
    //decodedToken now has the payload data we added when we created the token in user model (like _id, username, email)


        const user = await User.findById(decodedToken._id) // Finds the user document using the _id extracted from the decoded JWT.
            // This _id was added to the token payload when the token was created using jwt.sign() in the user model.
            .select("-Password -refreshToken");

        if (!user) {
            console.log(" User not found for ID:", decodedToken._id);
            throw new ApiError(401, "Invalid Access Token");
        }

        //console.log(" User authenticated:", user.Username);
        req.user = user; //req object with .user(we can name it .cooldeep too) has the user from above
        next();

    } catch (error) {
        console.error("Auth error:", error.name, "-", error.message);
        
        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid token");
        }
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired");
        }
        
        throw error;
    }
});
/* 
The verifyJWT middleware runs before the controller and verifies the access token. 
After verification, it decodes the token and attaches the logged-in user’s data to req.user. 
Because of this, before the controller starts executing, the backend already knows which user is logged in. 
Using req.user._id, the controller can safely update that specific user’s data in the database without relying on the client to send a user ID.


gpt explaination

When we say “verifies the token”, it means:
❌ NOT “checking if tokens are the same”
✅ YES “checking the token’s signature, integrity, and expiry”


🧸 KID VERSION (no crypto words yet)
Think of a JWT like a sealed letter ✉️ with:
a message inside (user info)
a special wax seal

Backend checks:
Is the seal broken?
Was this seal made by me?
Is the letter still valid (not expired)?

If all yes → allowed
If any no → rejected


NOW THE TECH VERSION (slow & clear)

A JWT has 3 parts:
header.payload.signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOiIxMjMifQ
.
Xk9p3abc123SIGNATURE


🔐 WHAT jwt.verify(token, secret) ACTUALLY DOES

1️⃣ Recreates the signature
Backend:
Takes header + payload
Uses your secret key
Recalculates what the signature SHOULD be

2️⃣ Compares signatures which are
Calculated signature 
Token’s signature 
If they don’t match → ❌ token was tampered with
👉 This is the main security check

3️⃣ Checks expiration (exp)
If token is expired:
TokenExpiredError ❌

4️⃣ Decodes payload
Only AFTER verification:
decoded = { userId, email, iat, exp }


This decoded payload becomes:
req.user = decoded

❌ WHAT IT DOES NOT DO
JWT verify does NOT:
compare access token with refresh token
check database
check cookies manually
check frontend state


*/