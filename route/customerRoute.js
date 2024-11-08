const express = require('express')
const {getAllCustomers,
    getCustomerByEmail,
    getCustomerByName,
    getCustomerByTown,
    createCustomer,
    updateCustomer,
    deleteCustomerByEmail,
    deleteAllCustomers,
    customerLogin,
    addAmount,
    setAccountType} = require('../controllers/customerController')
const {upload} =  require('../fileStorage')
const {customerAuthHandler,authHandler} = require('../middleware/authMiddleware')

const customerRouter = express.Router()

customerRouter.get('/all',authHandler,getAllCustomers)
customerRouter.get('/:email',customerAuthHandler,getCustomerByEmail)
customerRouter.get('/:name',customerAuthHandler,getCustomerByName)
customerRouter.get('/:town',customerAuthHandler,getCustomerByTown)
customerRouter.post('/:email',authHandler,addAmount)
customerRouter.post('/acounttype/:email',authHandler,setAccountType)
customerRouter.post('/accounts/add',createCustomer)
customerRouter.post('/accounts/login',customerLogin)
customerRouter.put('/:email',customerAuthHandler,updateCustomer)
customerRouter.delete('/:email',authHandler,deleteCustomerByEmail)
customerRouter.delete('/all',authHandler,deleteAllCustomers)

module.exports={customerRouter}