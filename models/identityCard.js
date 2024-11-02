const {Schema,model} = require('mongoose')

const identityCardSchema = new Schema({
    
    filename:{type:String},
    path:String,
    contenType:String
})

const IdentityCard = model('IdentityCard',identityCardSchema)

module.exports = {IdentityCard}