//grab knex config object
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[dbEnv]);
