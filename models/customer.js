const Joi = require('joi')
const {Schema,model} = require('mongoose')

//creation de notre schema

const customerSchema = new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    phone:String,
    town:String,
    location:String,
    NIC:{type:String},
    NIC_Verso:{type:String},
    Job:String
})

const Customer = model('Customer',customerSchema)
const validateInput = function( data)
{
    const customerInputSchema = Joi.object({
        firstname: Joi.string().min(3).max(100).required(),
        lastname: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(9).required(),
        town:Joi.string().min(3).max(127),
        location: Joi.string().min(10).required(),
        Job: Joi.string().min(3).required(),
        NIC: Joi.string(),
        NIC_Verso: Joi.string()

    })
    return customerInputSchema.validate(data)
}

module.exports ={Customer,validateInput}