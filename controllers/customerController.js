const asyncHandler = require('express-async-handler')
const {Customer,validateInput} = require('../models/customer')


const getAllCustomers = asyncHandler(async(req,res)=>{

    const customers = await Customer.find({})
    return res.status(200).json({customers})
})

const getCustomerByName = asyncHandler(async(req,res)=>{
    if(!req.params.firstname)
    {
        return res.status(400).json({message:"veuillez entrer un nom valide "})
    }
    const data = await Customer.find({lastname:req.params.name})
    if(!data)
    {
        return res.status(404).json({message:"l'utilisateur recherche est introuvable !"})
    }
    return res.status(200).json({data:data})

})

const getCustomerByEmail = asyncHandler(async(req,res)=>{

    if(!req.params.email)
        {
            return res.status(400).json({message:"veuillez entrer un email  valide "})
        }
        const data = await Customer.find({email:req.params.email})
        if(!data)
        {
            return res.status(404).json({message:"l'utilisateur recherche est introuvable !"})
        }
        return res.status(200).json({data:data})
})

const getCustomerByTown = asyncHandler(async(req,res)=>{
    if(!req.params.town)
        {
            return res.status(400).json({message:"veuillez entrer une ville valide "})
        }
        const data = await Customer.find({town:req.params.town})
        if(!data)
        {
            return res.status(404).json({message:"les clients recherche sont introuvables !"})
        }
        return res.status(200).json({data:data})
})

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
    console.log(req.body)
    const NIC = req.files.NIC ? req.files.NIC[0].path : null;
    const NIC_Verso = req.files.NIC_Verso ? req.files.NIC_Verso[0].path : null;
    
    const customer = new Customer({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        town:req.body.town,
        location:req.body.location,
        Job:req.body.Job,
        NIC:NIC,
        NIC_Verso:NIC_Verso
    })
    const savedData = await customer.save()
    return res.status(201).json({data:savedData})

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
            email: req.body.email,
            phone:req.body.phone,
            town:req.body.town,
            location:req.body.location
        }
    })

    return res.status(202).json({data:updatedCustomer})
})

const deleteCustomerByEmail = asyncHandler(async(req,res)=>{
    if(!req.params.email)
    {
        throw new Error("veuilez entrer un email valide !")
    }
    const deletedUser= await Customer.deleteOne({email:req.body.email});
    return res.status(200).json({message: deletedUser})
})

const deleteAllCustomers = asyncHandler(async(req,res)=>{

    let deletedCustomer = await Customer.deleteMany()
    return res.status(204).json({message: deletedCustomer})
})

module.exports = {getAllCustomers,getCustomerByEmail,getCustomerByName,getCustomerByTown,createCustomer,updateCustomer,deleteCustomerByEmail,deleteAllCustomers}