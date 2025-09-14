const {User,validateUser,validateLogin} = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async(req,res)=>{
    
    const users = await User.find({})

    return res.status(200).json({data:users})
})

const getUserByUsername = asyncHandler(async(req,res)=>{

    if(!req.params.username)
    {
        throw new Error('veuillexz entrer un utilisateur valide !')
    }
    let user = await User.find({username:req.params.username})
    if(!user)
    {
        return res.status(404).json({message: "utilisateur introuvable !"})
    }
    return res.status(200).json({data:user})
})
const createUser = asyncHandler(async(req,res)=>{
    const {error} = validateUser(req.body)
    if(error)
    {
        throw new Error(error.details[0].message)
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    const user  = new User({
        username:req.body.username,
        email: req.body.email,
        password:hashPassword,
        isAdmin:false
    })
    
    let savedData = await user.save()
    return res.status(201).json({data:savedData,saved:true})
})

const connectUser = asyncHandler(async(req,res)=>{
    
    const {error} = validateLogin(req.body)
    if (error) throw new Error(error.details[0].message)
    
        let user = await User.findOne({username:req.body.username})
        if(!user)
        {
            return res.status(404).json({message: "l'utilisateur n'existe pas ! "})
        }
    let isSamePassword = await bcrypt.compare(req.body.password,user.password)
    if(!isSamePassword)
    {
        return res.status(400).json({message:"incorrect email/password"})
    }
    const data = {
        username:user.username,
        email:user.email,
        admin:user.isAdmin
    }
    let token = user.generateToken({_id:user.id})
    return res.status(200).json({user:data,token:token})
})

const deleteUser = asyncHandler(async(req,res)=>{
    if(!req.user || (req.user && !req.user.isAdmin))
        {
            return res.status(401).json({message: "operation non permise !"})
        }
    if(!req.params.email)
    {
        throw new Error("veuillez entrer un email valide !")
    }
    if(!req.user || (req.user && !req.user.isAdmin))
    {
        return res.status(401).json({message: "operation non permise !"})
    }
    const deletedUser = await User.deleteOne({email:req.params.email})
    return res.status(404).json({message: deletedUser})
})

const deleteAllUser = asyncHandler(async(req,res)=>{
    
    if(!req.user || (req.user && !req.user.isAdmin))
        {
            return res.status(401).json({message: "operation non permise !"})
        }
    const deletedContent = await User.deleteMany({isAdmin:false})
    return res.status(204).json({message:deletedContent})
})

const createAdmin = asyncHandler(async(req,res)=>{
    /*
    ici on va creer notre superutilisateur et on va verifier si l'administrateur est deja present 
    si ce n'est pas le cas on va le creer 
    */
    let admin = await User.findOne({isAdmin:true})
    if(admin)
    {
        return res.status(401).json({message: "l'administrateur existe deja !"})
    }
    const {error} = validateUser(req.body)
    if(error)
    {
        throw new Error(error.details[0].message)
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    const user  = new User({
        username:req.body.username,
        email: req.body.email,
        password:hashPassword,
        isAdmin:true
    })
    
    let savedData = await user.save()
    return res.status(201).json({data:savedData,saved:true})
    
})

module.exports = {getAllUsers,getUserByUsername,createUser,deleteAllUser,deleteUser,connectUser,createAdmin}