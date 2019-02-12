const knex = require('knex');
const dbConfig = require('./knexfile');

const dbEnv = process.env.testing || 'development';

const db = knex(dbConfig[dbEnv]);

module.exports = db;