// eslint-disable-next-line
const dotenv = require('dotenv');

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3000;
const MONGODB_URL = `${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`;
const BASE_URL = `http://localhost:${APP_PORT}`;
const JWT_KEY = process.env.JWT_KEY || '';
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '1h';

module.exports = {
  IS_PRODUCTION: true,
  IS_DEVELOPMENT: false,
  IS_TESTING: false,

  APP_PORT,
  MONGODB_URL,
  BASE_URL,

  JWT_KEY,
  TOKEN_EXPIRES_IN,
};
