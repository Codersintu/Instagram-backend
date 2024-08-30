const jwt=require('jsonwebtoken')
const JwtAuth=(req,res,next)=>{
    const token=(req.cookies && req.cookies.token) || null;

    if (!token){
 return res.status(400).json({
    success:false,
    message:'not authorized'
 })
    } 

    try {
        const payload=jwt.verify(token,process.env.SECRET)
        req.user={
            id: payload.id, 
            email:payload.email
        }
    } catch (error) {
        
    }
    next();
}

module.exports=JwtAuth;