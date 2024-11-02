const express = require('express')
const { getAllUsers, getUserByUsername, createUser,deleteUser, deleteAllUser,connectUser, createAdmin } = require('../controllers/userController')
const { authHandler } = require('../middleware/authMiddleware')

const userRouter = express.Router()

userRouter.get('/all',getAllUsers)
userRouter.get('/:username',getUserByUsername)
userRouter.post('/new',createUser)
userRouter.post('/admin',createAdmin)
userRouter.post('/login',connectUser)
userRouter.delete('/:email',deleteUser)
userRouter.delete('/all',deleteAllUser)

module.exports = {userRouter}