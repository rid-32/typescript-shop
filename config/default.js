// eslint-disable-next-line
const dotenv = require('dotenv');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'production';
const APP_PORT = process.env.APP_PORT || 3000;
const MONGODB_URL = `${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`;

module.exports = {
  NODE_ENV,
  APP_PORT,
  MONGODB_URL,
};
