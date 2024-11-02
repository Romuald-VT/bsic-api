const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() +'-'+ file.originalname)
    },
    destination: function(req,file,cb)
    {
        cb(null,path.join(__dirname,'uploads'))
    }
})
const upload = multer({storage:storage})

module.exports = {upload}