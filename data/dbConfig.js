const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const config = require('../knexfile.js')[dbEnvironment];

module.exports = require('knex')(config);