const express = require('express')
const {getAllCustomers,
    getCustomerByEmail,
    getCustomerByName,
    getCustomerByTown,
    createCustomer,
    updateCustomer,
    deleteCustomerByEmail,
    deleteAllCustomers,
    customerLogin} = require('../controllers/customerController')
const {upload} =  require('../fileStorage')
const {customerAuthHandler,authHandler} = require('../middleware/authMiddleware')

const customerRouter = express.Router()

customerRouter.get('/all',authHandler,getAllCustomers)
customerRouter.get('/:email',customerAuthHandler,getCustomerByEmail)
customerRouter.get('/:name',customerAuthHandler,getCustomerByName)
customerRouter.get('/:town',customerAuthHandler,getCustomerByTown)
customerRouter.post('/add',createCustomer)
customerRouter.post('/login',customerLogin)
customerRouter.put('/:email',customerAuthHandler,updateCustomer)
customerRouter.delete('/:email',customerAuthHandler,deleteCustomerByEmail)
customerRouter.delete('/all',customerAuthHandler,deleteAllCustomers)

module.exports={customerRouter}