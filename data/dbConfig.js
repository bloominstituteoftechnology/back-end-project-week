require('dotenv').config(); // load the .env file content

const knex = require('knex');
const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const knexConfig = require('../knexfile.js')[dbEngine];

module.exports = knex(knexConfig);