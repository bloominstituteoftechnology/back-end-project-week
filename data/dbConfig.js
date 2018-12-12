const dbEngine = process.env.DB || 'development'
const knexConfig = require('../knexfile')[dbEngine]
module.exports = require('knex')(knexConfig)