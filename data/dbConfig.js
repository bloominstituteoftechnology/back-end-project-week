const dbEnviorment = process.env.DB_ENVIRONMENT || 'development'
const knexConfig = require('../knexfile')[dbEnviorment]
module.exports = require('knex')(knexConfig)