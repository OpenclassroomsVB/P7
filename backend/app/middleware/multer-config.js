const multer = require('multer')         //Multer import

const MIME_TYPES = {                    //Constitution of the MIME_TYPES object (to set the file extension)
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage = multer.diskStorage({            //Configuration for image storage
    destination: (req, file, callback) => {     //Destination
        callback(null, './app/images')
    },
    filename: (req, file, callback) => {        //Structure of the file name
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        if (file.originalname.split(".")[1]) {
            callback(null, Date.now() + "_" + name);
          } else {
            callback(null, Date.now() + "_" + name + "." + extension);
          }
    },
})

module.exports = multer({ storage: storage }).single('imageUrl')    //Multer-configuration export