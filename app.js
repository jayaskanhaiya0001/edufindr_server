import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
const app  = express();

// app.use(express.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 1000000000000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(cookieParser());
app.use(cors())

//importing routes

import user from "./routes/userRoutes.js";
import course from "./routes/courseRoutes.js"
import teacher from "./routes/teacherRoutes.js"
import testSeries from "./routes/examRoutes.js"
import freeBees from "./routes/freeBeesRoutes.js"
import blog from "./routes/blogRouters.js"
import errorMiddleware from "./middleware/errorMiddleware.js";



app.use("/api/v1", user);
app.use("/api/v1",course);
app.use("/api/v1",teacher);
app.use("/api/v1",testSeries);
app.use("/api/v1",freeBees);
app.use("/api/v1",blog);

app.use(errorMiddleware); //this position is imp. use here only.
export default app;