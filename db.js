const mongoose = require('mongoose')
const {logger} = require('./logging/logger')


const dbConnection = async()=>{

    try{
        await mongoose.connect(process.env.DB_URL)
        logger.info('connecte a la base de donnees')
    }
    catch(error)
    {
        logger.error(error.message)

    }
}

module.exports = {dbConnection}