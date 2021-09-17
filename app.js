require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const session = require('express-session'); 
const passport = require("./helpers/passport");
const cors = require("cors");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const burgerRouter = require("./routes/burger");
const restaurantRouter= require("./routes/restaurant")


mongoose
    .connect(process.env.DB,{
        useUnifiedTopology: true
        })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
    console.error("Error connecting to mongo", err)
    })

    
const app = express();

app.use(
    cors({
        origin:["http://localhost:3000","https://brgrclub.herokuapp.com/", "https://brgrclub.netlify.app/"],
        credentials:true
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret:process.env.SECRET,
        saveUninitialized:true,
        resave:true
    })
)


app.use( passport.initialize() )
app.use( passport.session() )


app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth',authRouter)
app.use('/api/burger',burgerRouter)
app.use('/api/restaurant',restaurantRouter)

app.use("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "public","index.html"));
   });
   
module.exports = app;