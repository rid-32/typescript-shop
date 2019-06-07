const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION: false,
  IS_TESTING: false,
};
