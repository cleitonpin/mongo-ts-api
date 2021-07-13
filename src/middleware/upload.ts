import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    },
});

const MAX_FILE_SIZE = 26214400 // 25 MB

const limits = {
    fileSize: MAX_FILE_SIZE
}

const uploads = multer({ storage, limits })

export default uploads;