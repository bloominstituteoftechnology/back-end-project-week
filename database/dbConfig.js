const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const config = require('../knexfile.js')[dbEnvironment];


// const knex = require('knex');

// const knexConfig = require('../knexfile.js');

module.exports = require('knex')(config);


