import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();
const session = require('express-session');

let app = express();

//Lưu ý rằng để sử dụng req.user, bạn cần phải sử dụng session middleware để lưu trữ thông tin user
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));
app.use(cors({
    origin: process.env.URL_REACT,
    credentials: true
}));
console.log(process.env.URL_REACT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//port === undefind => port = 6969
app.listen(port, () => {
    console.log(`backend nodejs is running on the port: ${port}`)
})