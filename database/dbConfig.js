const environment = process.env.NODE_ENV || 'development';

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environmentConfig = knexConfig[environment]

const connection = knex(environmentConfig)

//module.exports = knex(knexConfig.development);

module.exports = connection;