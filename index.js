import express from "express";
import dotenv from "./configs/dotenv.js";
import router from "./routers/index.js";
import database from "./configs/database.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import session from "express-session";
// import reviewRoute from './routes/reviewRoute.js';

const port = dotenv.PORT || 3001;

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    secret : 'secret_key',
    resave : false,
    saveUninitialized : true
}));
app.use(flash());
app.use('/uploads',express.static('uploads'));

app.use('/',router);
// app.use("/review", reviewRoute);

app.listen(port,(err)=>{
    if(!err){
        console.log("Server start.");
        console.log("http://localhost:"+port);                
    }
})
