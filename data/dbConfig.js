// const knex = require('knex');
// const config = require('../knexfile.js').development;

// module.exports = knex(config);

// The code above is what it looks like BEFORE we configured Heroku to use 'postgres'

const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';

const config = require('../knexfile.js')[dbEnvironment];

module.exports = require('knex')(config);
