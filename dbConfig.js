const knex = require('knex');
const dbconfig = require('./knexfile');
const dbEnv = 'development' || process.env.DB_ENV ;
module.exports = knex(dbconfig[dbEnv]);