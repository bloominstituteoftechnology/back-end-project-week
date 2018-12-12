const knex = require('knex');
const config = require('../knexfile');

const knexConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;

module.exports = knex(knexConfig);
