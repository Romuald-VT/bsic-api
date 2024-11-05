const {Schema,model} = require('mongoose')


const companySchema = new Schema('company',{
    companName:String,
    companyStatus:String,
    companCapital:String,
    ceo:String,
    amount:String,
    accountType:String
})