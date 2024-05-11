import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/uploads/')
    },
    filename: function (req, file, cb) {
        const generatename = Math.round(Math.random() * 1e9);
        const extensionname = file.originalname.split(".").pop();

        const newname = `${generatename}.${extensionname}`;

        cb(null, newname);
    }
})

const upload = multer({ storage: storage });

export { upload };
