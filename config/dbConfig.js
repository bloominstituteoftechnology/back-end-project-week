const knex = require('knex');

const env = process.env.DB_ENV || 'production'
const config = require('../knexfile')[env];

const db= knex(config);

module.exports = db
