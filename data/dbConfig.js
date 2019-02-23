const knex = require('knex');

const ENV = process.env.DB_ENV || 'development'

const knexConfig = require('../knexfile.js')[ENV];

module.exports = knex(knexConfig);