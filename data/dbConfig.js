const dbEnviroment = process.env.DB_ENVIROMENT;

const config = require('../knexfile.js')['development'];
// const config = require

module.exports = require('knex')(config);

// hero run knex migrate:latest -a lambda-notes