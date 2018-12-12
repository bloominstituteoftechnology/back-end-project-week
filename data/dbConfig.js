const dbEnviroment = process.env.DB_ENVIROMENT;

const config = require('../knexfile.js')['production'];


module.exports = require('knex')(config);