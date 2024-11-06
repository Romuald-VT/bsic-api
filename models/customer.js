const Joi = require('joi')
const {Schema,model} = require('mongoose')

//creation de notre schema

const customerSchema = new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String,
    phone:String,
    town:String,
    location:String,
    photo_profil:String,
    job:String,
    amount:Number,
    accountType:String
})

const Customer = model('Customer',customerSchema)
const validateInput = function( data)
{
    const customerInputSchema = Joi.object({
        firstname: Joi.string().min(3).max(100).required(),
        lastname: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/[a-z0-9]/i).required(),
        phone: Joi.string().min(9).required(),
        town:Joi.string().min(3).max(127).required(),
        location:Joi.string().required(),
        job: Joi.string().min(3).required(),
    })
    return customerInputSchema.validate(data)
}

const validateCustomerLogin = function(data)
{
    const customerLoginSchema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().pattern(/[a-z0-9]/i)
    })

    return customerLoginSchema.validate(data)
}

module.exports ={Customer,validateInput,validateCustomerLogin}