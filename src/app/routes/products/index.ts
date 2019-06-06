import express = require('express');
import * as multer from 'multer';

import * as handlers from './handlers';
import checkAuth from '../../middleware/check-auth';

const router = express.Router();
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

router
  .route('/')
  .get(handlers.getProducts)
  .post(checkAuth, upload.single('productImage'), handlers.createProduct);

router
  .route('/:id')
  .get(handlers.getProductById)
  .delete(checkAuth, handlers.deleteProduct)
  .patch(checkAuth, handlers.changeProduct);

export default router;
