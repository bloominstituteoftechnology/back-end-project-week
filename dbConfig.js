const knex = require('knex');
const dbconfig = require('./knexfile');
const dbEnv = process.env.DB || 'development' || process.env.DB_ENV ;
module.exports = knex(dbconfig[dbEnv]);