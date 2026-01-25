import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    maxAge: 86400
}

app.use(cors(corsOptions))

app.use(cookieParser());




//routes

import router from "./routes/route.js";

app.use("/", router) //http://localhost:7000/ ../signup


export default app;