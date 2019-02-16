const knex = require('knex');
const config = require('../knexfile.js');

const db_Env = process.env.DATABASE_URL|| 'production'

module.exports = knex(config[db_Env]);
