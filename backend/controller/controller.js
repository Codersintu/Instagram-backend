
const bcrypt=require('bcrypt')
const emailvalidate=require('email-validator');
const userModel = require('../userschema/userschema');
const {use}=require('../router/authrouter')

const Signup=async (req,res,next)=>{
    const { name,email,password,confirmpassword}=req.body;//get the data from post in req.body
    console.log(name,email,password,confirmpassword);
      
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).json({
                success:false,
                message:'all field are required'
            })
        }
        const validate=emailvalidate.validate(email)
        if (!emailvalidate) {
          return  res.status(400).json({
                success:false,
                message: 'invalid email'
            })
        }

        if (password !== confirmpassword) {
          return  res.status(400).json({
                success:false,
                message: 'password & confirmpassword not equal'
            })
        }

    try {
        const userInfo=userModel(req.body)
        const result= await userInfo.save();
        return res.status(200).json({
            success:true,
            data:{}
        })
    
    } catch (e) {
        if (e.code===11000) {
         return res.status(400).json({
                success: false,
                message:'already registered email'
            })
        }
       return res.status(400).json({
            success:false,
            message: e.message
        })
    }

}

const Signin=async (req,res)=>{
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({
            success:false,
            message: 'all field are required'
        })
    }
     
    try {
        const user=await userModel
        .findOne({
            email
        })
        .select('+password')

        if (!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(400).json({
                success:false,
                message:"invalid crendential"
            })
        }

        const token=user.jwtToken;
        user.password=undefined;

    const cookieOption={
        maxAge: 24*60*60*1000,
        httpOnly:true
    };
    res.cookie('token',token,cookieOption);
    return res.status(400).json({
        sucess: true,
        data: user
    })

    } catch (error) {
        return res.status(400).json({
            sucess: false,
           message: error.message
        })
    }
}

const getuser=async(req,res,next)=>{
    const userId=req.userid;
    try {
        const user=await userModel.findById(userId)
        return res.status(200).json({
            success:true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const logout=(req,res)=>{
    
    try {
        cookiesoption={
            expaires: '24hr',
            httpOnly: true
        }
        res.cookie('token',null,cookiesoption)
        return res.status(200).json({
            success:true,
            message: 'user logout'
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
  

module.exports={
    Signup,
    Signin,
    getuser,
    logout
}