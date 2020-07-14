const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const knexConfig = require('../knexfile')[dbEnvironment];

module.exports = require('knex')(knexConfig);


