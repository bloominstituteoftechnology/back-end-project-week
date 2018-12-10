const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = kenx(knexConfig.development);