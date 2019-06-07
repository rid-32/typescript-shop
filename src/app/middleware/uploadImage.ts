import * as multer from 'multer';

// the name of key in the body
const keyName = 'productImage';
// multer will execute those functions when new file
// will be received
const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb): void => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb): void => {
  if (/(jpeg|jpg|png)/i.test(file.mimetype)) {
    // accept the file
    cb(null, true);
  } else {
    // reject the file
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

export default upload.single(keyName);
