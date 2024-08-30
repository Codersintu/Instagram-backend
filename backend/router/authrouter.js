const express=require('express');
const { Signup,Signin,getuser, logout} = require('../controller/controller');
const JwtAuth = require('../middleware/JwtAuth');
const authRouter=express.Router();
authRouter.post('/Signup',Signup)
authRouter.post('/Signin',Signin)
authRouter.get('/user',JwtAuth,getuser)
authRouter.get('/logout',JwtAuth,logout)

module.exports=authRouter;