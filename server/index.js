import cors from 'cors';
import router from './routes/router.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config('/.env')

const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/green-miles").then(()=>{
    console.log("Connection Successful!");
}).catch((err)=>{
    console.log("Error: ", err);
})

app.use('/', router);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running...");
})