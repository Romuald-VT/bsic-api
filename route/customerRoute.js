const express = require('express')
const {getAllCustomers,
    getCustomerByEmail,
    getCustomerByUUID,
    createCustomer,
    updateCustomer,
    deleteCustomerByEmail,
    deleteAllCustomers,
    addAmount,
    setAccountType,
    showInfo} = require('../controllers/customerController')
const {upload} =  require('../fileStorage')
const {customerAuthHandler,authHandler} = require('../middleware/authMiddleware')

const customerRouter = express.Router()

customerRouter.get('/info/all',authHandler,getAllCustomers)
customerRouter.get('/info/:email',authHandler,getCustomerByEmail)
customerRouter.get('/info/code/:code',showInfo)
customerRouter.get('/v1/info/code/:code',customerAuthHandler,getCustomerByUUID)
customerRouter.post('/info/:email',authHandler,addAmount)
customerRouter.post('/acounttype/:email',authHandler,setAccountType)
customerRouter.post('/accounts/add',authHandler,createCustomer)
customerRouter.put('/info/:email',authHandler,updateCustomer)
customerRouter.delete('/info/:email',authHandler,deleteCustomerByEmail)
customerRouter.delete('/info/all',authHandler,deleteAllCustomers)

module.exports={customerRouter}