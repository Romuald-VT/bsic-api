const jwt  = require('jsonwebtoken')
const { User } = require('../models/user')

const authHandler = async(req,res,next)=>{
    const token = req.header('Authorization')
    if(!token)
    {
        return res.status(401).json({message: "acces refuse !"})
    }
    let decode = await jwt.verify(token,process.env.JWT_SECRET)
    let user = await User.findById({_id:decode._id}).select('-password')
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
    let user = await User.findById({_id:decode._id,email:decode.email}).select('-password')
    if(!user)
    {
        throw new Error("tentative d'intrusion arret du systeme !")
        process.env.exit(-1)
    }
    req.user = user
    next()

}
module.exports = {authHandler,customerAuthHandler}