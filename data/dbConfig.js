const dbEnviroment = process.env.DB_ENVIROMENT || 'development';

// const config = require('../knexfile.js')['development'];

const config = require('../knexfile.js')[dbEnviroment];
// const config = require

module.exports = require('knex')(config);

// hero run knex migrate:latest -a lambda-notes