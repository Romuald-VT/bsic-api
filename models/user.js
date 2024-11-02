const {Schema,model} = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new Schema({
    
    username:String,
    email:{type:String,unique:true},
    password:String,
    isAdmin:{type:Boolean},
})

userSchema.methods.generateToken = function(data)
{
    return jwt.sign(data,process.env.JWT_SECRET)
}

const validateUser = (data)=>{
   const userSchema = Joi.object({
    username:Joi.string().min(3).max(100).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp('[a-zA-Z0-9]{8}$'))
   })

   return userSchema.validate(data)
}
const validateLogin = (data)=>{
    const loginSchema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        password: Joi.string().pattern(new RegExp('[a-zA-Z0-9]{8}$'))
    })
    return loginSchema.validate(data)
}
const User = model('User',userSchema)

module.exports = {User,validateUser,validateLogin}