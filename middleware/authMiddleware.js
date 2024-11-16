const jwt  = require('jsonwebtoken')
const { User } = require('../models/user')
const { Customer } = require('../models/customer')

const authHandler = async(req,res,next)=>{
    const token = req.header('Authorization')
    if(!token)
    {
        return res.status(401).json({message: "acces refuse !"})
    }
    let decode = await jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode)
    let user = await User.findById({_id:decode.id}).select('-password')
    if(!user)
    {
        throw new Error("tentative d'intrusion arret du systeme !")
        process.env.exit(-1)
    }
    req.user = user
    next()
}

const customerAuthHandler = async(req,res,next)=>{
    
    const token = req.header('Authorization')
    if(!token)
    {
        return res.status(401).json({message: "acces refuse !"})
    }
    let decode = await jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode)
    let user = await Customer.findById({id:decode.id})
    if(!user)
    {
        throw new Error("tentative d'intrusion arret du systeme !")
        process.env.exit(-1)
    }
    req.customer = user
    next()

}
module.exports = {authHandler,customerAuthHandler}