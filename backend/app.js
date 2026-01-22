import express from "express";
import cors from "cors"

const app = express()

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.urlencoded({ extended: true }));



//routes

import router from "./routes/route.js";

app.use("/", router) //http://localhost:7000/ ../signup


export default app;