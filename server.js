
import app from "./app.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';
import connectDatabase from "./config/database.js"
dotenv.config({path: "config/config.env"});

connectDatabase();



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
app.listen(process.env.PORT,()=>{
    console.log(`Server running on Port ${process.env.PORT}`)
})