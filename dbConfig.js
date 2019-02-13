const knex = require('knex');
const dbconfig = require('./knexfile');
const dbEnv = process.env.DB_ENV || 'development';
module.exports = knex(dbconfig[dbEnv]);