const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development'; // change to NODE_ENV when deploying to Heroku

module.exports = knex(config[dbEnv]);