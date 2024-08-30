const express=require('express')
const authRouter = require('./router/authrouter')
const databaseconnect = require('./config/db')
const cookieparser=require('cookie-parser')

const app=express();
app.use(express.json())
databaseconnect();
app.use(cookieparser())
app.use('/api/auth',authRouter);
app.use('/',(req,res)=>{
    res.status(200).json({
     data: 'jwtauth is ready for server'
    })
})
module.exports=app;