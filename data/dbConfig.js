const knex = require('knex');
const config = require('../knexfile.js')[process.env.ENVIRONMENT];
module.exports = knex(config);