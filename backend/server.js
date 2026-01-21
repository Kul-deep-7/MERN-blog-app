import dotenv from "dotenv";
dotenv.config();

import express from "express"
import connectDB from "./database/db.js"
const app = express()

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 7000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
        (error)=>{
        console.error("Failed to start server", error);
        process.exit(1)
    }
})



// app.get("/",(req,res)=>{
//     res.send("hello exoress")
// })

// app.listen(5000,()=>{
//     console.log("server statrted")
// })
