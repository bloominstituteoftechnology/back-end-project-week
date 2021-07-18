const knex = require('knex');

const env = process.env.DB_ENV || 'development'
const config = require('../knexfile.js');

const db= knex(config[env]);

module.exports = db
