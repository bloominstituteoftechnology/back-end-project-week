
const knexConfig = require('../knexfile.js')['production'];

module.exports = require('knex')(knexConfig);