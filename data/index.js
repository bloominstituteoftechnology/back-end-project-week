const knex = require('knex');
const knexConfig = require('../knexfile.js');
const environment = process.env.DB || 'development';

module.exports = knex(knexConfig[environment]);
