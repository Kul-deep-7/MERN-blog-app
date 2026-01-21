import express from express;

const app = express()


//routes

import router from "./routes/route.js";

app.use("/api/users", router) //http://localhost:8000/api/users ../signup