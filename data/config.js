const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';

// console.log('dbEnvironment = ', dbEnvironment);


const config = require('../knexfile.js')[dbEnvironment];

module.exports = require('knex')(config);
