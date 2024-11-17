const {dbConnection} = require('./db')
const cors = require('cors')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const { userRouter } = require('./route/userRoute')
const { customerRouter } = require('./route/customerRoute')
const compression = require('compression')
const helmet = require('helmet')

const app = express()
const port = process.env.SERVER_PORT || 4000
/*const corsParams={
    origin: ['http://localhost:5173', 'https://www.bsicbankcameroun.com'],
    // Méthodes HTTP autorisées
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    
    // Headers autorisés
    allowedHeaders: ['Content-Type', 'Authorization'],
    
    // Expose ces headers côté client
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    
    // Autorise l'envoi de cookies
    credentials: true,
    
    
    // Durée de mise en cache des résultats préflight (en secondes)
    maxAge: 86400
}*/

dbConnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compression())
app.use(helmet())


app.use("/api/users",userRouter)
app.use("/api/customers",customerRouter)
app.use(errorHandler)
app.listen(port,()=>{
    console.log("the server is running on port ",port)
})

