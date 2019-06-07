import * as express from 'express';

import * as handlers from '../controllers/products';
import checkAuth from '../middleware/checkAuth';
import uploadImage from '../middleware/uploadImage';

const router = express.Router();

router
  .route('/')
  .get(handlers.getProducts)
  .post(checkAuth, uploadImage, handlers.createProduct);

router
  .route('/:id')
  .get(handlers.getProductById)
  .delete(checkAuth, handlers.deleteProduct)
  .patch(checkAuth, handlers.changeProduct);

export default router;
