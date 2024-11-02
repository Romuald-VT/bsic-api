const express = require('express')
const {getAllCustomers,
    getCustomerByEmail,
    getCustomerByName,
    getCustomerByTown,
    createCustomer,
    updateCustomer,
    deleteCustomerByEmail,
    deleteAllCustomers} = require('../controllers/customerController')
const {upload} =  require('../fileStorage')
const {authHandler} = require('../middleware/authMiddleware')

const customerRouter = express.Router()

customerRouter.get('/all',authHandler,getAllCustomers)
customerRouter.get('/:email',authHandler,getCustomerByEmail)
customerRouter.get('/:name',authHandler,getCustomerByName)
customerRouter.get('/:town',authHandler,getCustomerByTown)
customerRouter.post('/add',upload.fields([{name:'NIC'},{name:'NIC_Verso'}]),createCustomer)
customerRouter.put('/:email',authHandler,updateCustomer)
customerRouter.delete('/:email',deleteCustomerByEmail)
customerRouter.delete('/all',authHandler,deleteAllCustomers)

module.exports={customerRouter}