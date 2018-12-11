const knex = require('knex');
const config = require('../knexfile').production;

module.exports = knex(config);