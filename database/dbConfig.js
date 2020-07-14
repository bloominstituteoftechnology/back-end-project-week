const knex = require('knex');
const knexConfig = require('../knexfile');
const dbEnv = process.env.DB_ENV || 'development';
module.exports = knex(knexConfig[dbEnv]);