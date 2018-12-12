const knex = require('knex');
require('dotenv').config();
const dbEngine = process.env.DB || 'development';
const knexConfig = require('../knexfile.js'[dbEngine]);
module.exports = knex(knexConfig)