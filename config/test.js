const IS_TESTING = process.env.NODE_ENV === 'test';

module.exports = {
  IS_TESTING,
  IS_PRODUCTION: false,
  IS_DEVELOPMENT: false,
};
