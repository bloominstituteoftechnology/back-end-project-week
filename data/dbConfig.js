const knex = require('knex');
const knexConfig = require('../knexfile.js');
const dbConfig = knex(knexConfig.development);

module.exports = dbConfig;