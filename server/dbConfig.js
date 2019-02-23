const knex = require('knex');
require('dotenv').config;
const config = require('../knexfile.js');
const dbEnv= process.env.NODE_ENV || 'development'


module.exports = knex(config[dbEnv]);