const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const knex = require('../knexfile');
const knexConfig = require(knexConfig[dbEnvironment]);