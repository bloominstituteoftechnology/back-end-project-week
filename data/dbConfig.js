const knex = require('knex');
const knexConfig = require('../old.knexfile.js/index.js');
const dbEnv = process.env.DB_ENV || 'development';
const dbConfig = knex(knexConfig[dbEnv]);
console.log(`env var: db_env`, process.env.DB_ENV);
console.log(dbEnv);
module.exports = dbConfig;