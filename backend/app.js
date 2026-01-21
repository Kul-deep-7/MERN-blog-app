import express from "express";
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routes

import router from "./routes/route.js";

app.use("/api/users", router) //http://localhost:8000/api/users ../signup