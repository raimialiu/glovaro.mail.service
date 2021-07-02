const multer = require("multer")


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload =multer({storage})

const getUploadedFile = (request) => {
    return upload.array(request)
}

const fileUploadMiddleare = (req, res, next)=> {
    upload.array(getUploadedFile(req))

    next
}
module.exports ={
    fileUploadMiddleare
}