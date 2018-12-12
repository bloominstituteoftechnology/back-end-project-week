const dbEnviorment = process.env.DB || 'development'
const knexConfig = require('../knexfile')[dbEnviorment]
module.exports = require('knex')(knexConfig)