const knex = require('knex');
const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const config = require('../knexfile')[dbEnvironment];
module.exports = knex(config);