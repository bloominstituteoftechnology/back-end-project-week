const dbEnviroment = process.env.DB_ENVIROMENT || 'production';

// const config = require('../knexfile.js')['development'];

const config = require('../knexfile.js')[dbEnviroment];

module.exports = require('knex')(config);

// hero run knex migrate:latest -a lambda-notes