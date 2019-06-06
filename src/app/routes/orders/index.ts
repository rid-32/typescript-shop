import express = require('express');

import * as handlers from './handlers';
import checkAuth from '../../middleware/check-auth';

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
