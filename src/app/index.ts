import express = require('express');
import config = require('config');
import morgan = require('morgan');

import { products as productsRoutes, orders as ordersRoutes } from './routes';

const NODE_ENV = config.get('NODE_ENV');
const app = express();

// set up logger
if (NODE_ENV !== 'test') {
  if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }
}

// parsing request body
app.use(express.urlencoded());
app.use(express.json());

// handling CORS
app.use(
  (req, res, next): object | void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

      return res.status(200).json();
    }

    next();
  },
);

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// handle not found route
app.use(
  (req, res, next): void => {
    const error = new Error('Not Found');

    error['status'] = 404;

    next(error);
  },
);

// handle errors
app.use(
  // eslint-disable-next-line
  (err, req, res, next): void => {
    res.status(err.status || 500).json();
  },
);

export default app;
