const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Customer,validateInput, validateCustomerLogin} = require('../models/customer')


const getAllCustomers = asyncHandler(async(req,res)=>{

    const customers = await Customer.find({})
    return res.status(200).json({customers})
})


const getCustomerByEmail = asyncHandler(async(req,res)=>{
     
    if(!req.params.email)
        {
            return res.status(400).json({message:"veuillez entrer une addresse mail valide !"})
        }
        const data = await Customer.find({email:req.params.email})
        if(!data)
        {
            return res.status(404).json({message:"l'utilisateur recherche est introuvable !"})
        }
        return res.status(200).json({customer:data})
})

const generateUUID = ()=>{

    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let i=0;
    let code = []
    for(i=0;i<9;i++)
    {
       let k = Math.round(Math.random()*alphabet.length)
       code.push(alphabet[k])
    }
    code[4] = '-'
    return code.join("")
}

const createCustomer = asyncHandler(async(req,res)=>{
    
    const {error} = validateInput(req.body)
    if(error)
    {
        throw new Error(error.details[0].message)
    }
    const registeredCustomer = await Customer.findOne({email:req.body.email})
    if(registeredCustomer)
    {
        throw new Error("cet utilisateur existe deja !")
    }
    
    const uuid = generateUUID()
    const customer = new Customer({
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        phone:req.body.phone,
        email:req.body.email,
        job:req.body.job,
        accountNumber:req.body.accountNumber,
        accountType:req.body.accountType,
        amount:req.body.amount,
        customerUUID:uuid
        
    })
    const savedData = await customer.save()
    return res.status(201).json({data:savedData})

})

const addAmount = asyncHandler(async(req,res)=>{
    
    if(!req.params.email) return res.status(400).json({message:"veuillez ajouter un email valide !"})
    
    if(!req.body.amount) return res.status(400).json({message:"veuillez entrer un montant valide !"})
    
    const client = await Customer.findOne({email:req.params.email})

    if(!client) return req.status(404).json({message:"client introuvable !"})
    
    client.amount = req.body.amount
   const result =  await client.save()

    return res.status(200).json({firstname:result.firstname,lastname:result.lastname,amount:result.amount})
})

const setAccountType = asyncHandler(async(req,res)=>{
    
    if(!req.params.email) return res.status(400).json({message:"veuillez entrer un email valide !"})
    
    if(!req.body.accountType) return res.status(400).json({message:"type de compte non reconnu !"})
    
    const client = await Customer.findOne({email:req.params.email})
    if(!client) return res.status(404).json({message:"utilisateur introuvable !"}) 
    
    client.accountType = req.body.accountType
    const result = await client.save()

    return res.status(200).json({firstname:result.firstname,lastname:result.lastname,accountType:result.accountType})
    
})

const showInfo = asyncHandler(async(req,res)=>{
      
    if(!req.params.code)
    {
        throw new Error('veuillez entrer un code utilisateur valide !')
    }
    const data = await Customer.findOne({customerUUID:req.params.code})
    if(!data)
    {
        return res.status(404).json({message:"cet utilisateur est introuvable !"})
    }

    return res.status(200).json({customer:data})
})

const updateCustomer = asyncHandler(async(req,res)=>{
    
    if(!req.params.email)
    {
        throw new Error("veuillez entrer un email valide")
    }
    const {error} = validateInput(req.body)
    if (error)  throw new Error(error.details[0].message)

    const registeredCustomer = await Customer.findOne({email:req.params.email})
    if(!registeredCustomer)
    {
        res.status(404).json({message:"utilisateur introuvable !"})
    }
    const updatedCustomer = await Customer.updateOne({email:req.params.email},{
        $set:{   
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        email:req.body.email,
        job:req.body.job,
        amount:req.body.amount,
        accountNumber:req.body.accountNumber,
        accountType:req.body.accountType
        }
    })

    return res.status(202).json({data:updatedCustomer})
})

const deleteCustomerByEmail = asyncHandler(async(req,res)=>{
    if(!req.params.email)
    {
        throw new Error("veuilez entrer un numero de telephone valide !")
    }
    const deletedUser= await Customer.deleteOne({email:req.params.email});
    return res.status(200).json({message: deletedUser})
})

const deleteAllCustomers = asyncHandler(async(req,res)=>{

    let deletedCustomer = await Customer.deleteMany({})
    return res.status(204).json({message: deletedCustomer})
})

module.exports = {getAllCustomers,addAmount,getCustomerByEmail,
    createCustomer,updateCustomer,deleteCustomerByEmail,
    deleteAllCustomers,setAccountType,showInfo}