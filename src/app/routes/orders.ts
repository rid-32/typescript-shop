import * as express from 'express';

import * as handlers from '../controllers/orders';
import checkAuth from '../middleware/checkAuth';

const router = express.Router();

router
  .route('/')
  .get(checkAuth, handlers.getOrders)
  .post(checkAuth, handlers.createOrder);

router
  .route('/:id')
  .get(checkAuth, handlers.getOrderById)
  .delete(checkAuth, handlers.deleteOrder);

export default router;
