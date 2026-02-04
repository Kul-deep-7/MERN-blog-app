import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: "https://mern-blog-app-frontend-9hxa.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}

app.use(cors(corsOptions))

app.use(cookieParser());




//routes

import router from "./routes/route.js";

app.use("/", router) //http://localhost:7000/(or https://mern-blog-app-ef2s.onrender.com) ../signup


export default app;