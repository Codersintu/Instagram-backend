const mongoose=require('mongoose')
const {Schema}=mongoose;
const JWT=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userschema=new Schema({
    name:{
        type: String,
        required:[true,'user name is required'],
        minlength:[5,'minlength at least 5 char'],
        maxlength:[50,'maxlength will be less than 50'],
        trim:true

    },
    email:{
        type: String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        unique:[true,'already registerred']
    },
    password:{
        type: String,
        select:false
    },
    forgotpasswordToken:{
        type: String,
        select:false
    },
    forgotpasswordExpairyDate:{
       type: Date
    }
    
},{
    timestamps:true
})
userschema.pre('save', async function(next){
    if (!this.isModified('password')) {
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    return next();
})

userschema.method={
    jwtToken(){
        return JWT.sign(
            {id:this._id, email:this.email},
            process.env.SECRET,
            {expairesIn:'24hr'}
        )
    }
}

const userModel=mongoose.model('user',userschema)
module.exports=userModel;