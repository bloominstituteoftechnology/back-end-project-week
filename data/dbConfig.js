const knex = require('knex');
const config = require('../knexfile.js')[process.env.ENVIRONMENT.trim()];
module.exports = knex(config);