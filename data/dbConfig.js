const dbEngine = process.env.DB || 'development';
const config = require('../knexfile.js')[dbEngine];

module.exports = require('knex')(config);
