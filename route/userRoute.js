const express = require('express')
const { getAllUsers, getUserByUsername, createUser,deleteUser, deleteAllUser,connectUser, createAdmin } = require('../controllers/userController')
const { authHandler } = require('../middleware/authMiddleware')

const userRouter = express.Router()

userRouter.get('/all',getAllUsers)
userRouter.get('/:username',authHandler,getUserByUsername)
userRouter.post('/new',authHandler,createUser)
userRouter.post('/admin',createAdmin)
userRouter.post('/login',connectUser)
userRouter.delete('/:email',authHandler,deleteUser)
userRouter.delete('/all',authHandler,deleteAllUser)

module.exports = {userRouter}