const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "src/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        console.log("fieldname;", file.fieldname)
        console.log("filename;", file.filename)
        console.log("originalname;", file.originalname)
        const fileEkstension = path.extname(file.originalname)
        console.log("file ekstension;", fileEkstension)
        cb(null, file.fieldname + "-" + uniqueSuffix + fileEkstension)
    }
})
const upload = multer({storage})
module.exports = upload