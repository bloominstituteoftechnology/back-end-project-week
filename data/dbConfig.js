const knex = require('knex');
const environment = process.env.ENVIRONMENT || 'development;'
const config = require('../knexfile.js')[environment];

module.exports = knex(config);