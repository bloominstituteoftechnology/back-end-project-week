// const knex = require('knex');
// const config = require('../knexfile.js').development;

// module.exports = knex(config);

// The code above is what it looks like BEFORE we configured Heroku to use 'postgres'

const dbEngine = process.env.DB || 'development';
const config = require('../knexfile.js')[dbEngine];

module.exports - require('knex')(config);
