const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');
const { method } = require("lodash");
const passport = require("passport");
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    siteName :{
        type:String
    },
    location :{
        type:String
    },
    fullName :{
        type:String
    },
    designation:{
        type:String
    },
    mobileNo:{
        type:String
    },
    adharNo:{
        type:Number
    },
    address:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    
    },
    basicPay:{
        type:String
    },
    bankName:{
        type:String
    },
    accNo:{
        type:String
    },
    ifsccode:{
        type:String
    }
})

//Events
// userSchema.pre('save',function(next){
//     bcrypt.genSalt(10,(err,salt) =>{
//         bcrypt.hash(this.password ,salt,(err,hash)=>{
//             this.password = hash;
//             this.saltSecret = salt;
//             next();
//         })
//     })
// })

//method
// userSchema.methods.verifyPassword = function(password) {
 
//     return bcrypt.compareSync(password, this.password);
//   };

userSchema.methods.generateJwt = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
mongoose.model('User', userSchema )