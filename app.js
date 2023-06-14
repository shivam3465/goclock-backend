import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./router/user.js";
import transporterRouter from "./router/transporter.js";
import manufacturerRouter from "./router/manufacturer.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST','PUT', 'DELETE'],
    credentials: true,
}))

app.get('/',(req,res)=>{
    console.log("request came ")
    res.json({success: true,message: 'Success'})
})

app.use("/api/v1/user",userRouter)
app.use("/api/v1/transporter",transporterRouter)
app.use("/api/v1/manufacturer",manufacturerRouter)

export {app}