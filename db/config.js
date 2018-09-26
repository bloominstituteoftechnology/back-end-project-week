const dbEngine = process.env.DB || 'development';
const config = require('../knexfile')[dbEngine];

module.exports = require('knex')(config);