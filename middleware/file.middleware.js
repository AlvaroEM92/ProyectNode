const multer = require('multer');
const path = require('path')

const VALID_FILES = ['image/png','image/jpg','image/jepg']

const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
});

const fileFilter  = (req, file, cb) => {
     if(!VALID_FILES.includes(file.mimetype)){
        cb(new Error('Invalid file'))
     }
     else{
        cb(null, true)
     }
}

const upload = multer ({
    storage,
    fileFilter,
});

module.exports = {upload};