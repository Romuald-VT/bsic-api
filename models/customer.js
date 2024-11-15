const Joi = require('joi')
const {Schema,model} = require('mongoose')

//creation de notre schema

const customerSchema = new Schema({
    firstname:String,
    lastname:String,
    phone:String,
    email:{type:String,unique:true},
    job:String,
    amount:Number,
    accountType:String,
    accountNumber:String,
    customerUUID:{type:String,unique:true},
})

const Customer = model('Customer',customerSchema)
const validateInput = function(data)
{
    const customerInputSchema = Joi.object({
        firstname: Joi.string().min(3).max(100).required(),
        lastname: Joi.string().min(3).max(100).required(),
        phone: Joi.string().pattern(/[0-9]/).max(12).required(),
        job: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        accountNumber: Joi.number().min(16).required(),
        accountType: Joi.string().required(),
        amount: Joi.number().positive().required(),
        customerUUID: Joi.string().pattern(/[a-z0-9]-[a-z0-9]/).max(9)
    })
    return customerInputSchema.validate(data)
}



module.exports ={Customer,validateInput}