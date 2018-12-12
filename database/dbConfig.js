// const dbEngine = process.env.DB || 'development'
const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const knexConfig = require('../knexfile.js')[dbEnvironment];

module.exports = require('knex')(knexConfig);