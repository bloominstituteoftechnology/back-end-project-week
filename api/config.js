const _ = require(`lodash`);

const config = {
  env: process.env.NODE_ENV || `development`,
  port: process.env.PORT || 5000,
  db: process.env.MONGODB_URL || 'mongodb://localhost:/awesomelambdanotesdb',
};

const envConfig = require(`./${config.env}.js`);

module.exports = _.merge(config, envConfig);
