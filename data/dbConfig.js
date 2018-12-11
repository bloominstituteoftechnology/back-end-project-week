const knex = require('knex');
const config = require('../knexfile.js')[process.env];
module.exports = knex(config);