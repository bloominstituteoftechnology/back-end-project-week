const config = require('../knexfile.js');
const knex = require('knex');
const ENV = process.env.ENV || 'development';

module.exports = knex(config[ENV]);
