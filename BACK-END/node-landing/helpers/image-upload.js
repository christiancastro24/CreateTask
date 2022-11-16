const multer = require('multer')
const path = require('path')


const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/images/users/`)
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({ 
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor, envie apenas jpg ou png!'))
        }

        cb(undefined, true)
    }
})

module.exports = imageUpload