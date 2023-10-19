//Import statements of packages as we are using ES6 modules
//Rememeber we are using ES6 modules
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import  authRoutes  from "./routes/auth.js";   //as we are are using default export that't why we use authRoutes during import
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users,posts} from './data/index.js';

/* Configurations */
/* Configurations */
/* Configurations */

const __filename = fileURLToPath(import.meta.url);   //to grab current file url in ES6 modules
const __dirname = path.dirname(__filename);    //The path.dirname() method returns the directory name of a path as we give current file path to it
dotenv.config();   //to use .env files
// console.log(__dirname);

const app = express();
app.use(express.json());//middleware use to send something in request body of content-type:application/json
app.use(helmet());
//Helmet helps secure Express apps by setting HTTP response headers.these headers act as middlewares to enhace security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//Cross-Origin-Resource-Policy: Blocks others from loading your resources cross-origin
app.use(morgan("common"));
// Morgan npm gives you tokens like the client's user agent, the requested url, and the response time, among other things.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. {{limit}} : Controls the maximum request body size. If this is a number, then the value specifies the number of bytes

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(cors());  //will invoke our cross-origin sharing policies

app.use('/assets', express.static(path.join(__dirname, "/public/assets")));
//upper line menas /assets path will server for the path that joins by join and all items in public/asstes will be accessible by /assets



/* File Storage */
/* File Storage */
/* File Storage */

const storage = multer.diskStorage({
    //specifying destination for the uploaded files
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/public/assets"));    //picks erro here
        
    },
    //getting file original name
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });   //this upload variable will help us to save file anytime when we upload files

/* Routes  */
/* Routes  */
/* Routes  */

// routes with file
app.post('/auth/register', upload.single("picture"), register);
app.post('/post',verifyToken, upload.single("picture"),createPost)
//upper route is set here because we need upload variable here so that's why we can't move it to routes folder

//Available routes -linking routes with route files

app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/post',postRoutes)

//upper line is setting the route prefix to /auth that means all routes in authRouter function will use /auth as prefix in their route path

/* MongoDB Configuration */
/* MongoDB Configuration */
/* MongoDB Configuration */

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {     //an asyncrounous function returns promises
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => { console.log(`Server port:${PORT}`) })

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
   //now connected to mongo db atlas using connection string
}).catch((error) => console.log(error.message))