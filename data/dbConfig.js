//grab knex config object
const knex = require('knex');
const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);
