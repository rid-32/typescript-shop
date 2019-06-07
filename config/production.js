const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  IS_PRODUCTION,
  IS_DEVELOPMENT: false,
  IS_TESTING: false,
};
