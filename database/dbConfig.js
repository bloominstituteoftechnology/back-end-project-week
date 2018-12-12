const dbEngine = process.env.DB || 'development'
const knex = require('knex');
const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig[dbEngine]);
