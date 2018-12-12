

//== Knex Database =============================================================

//-- Dependencies --------------------------------
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const config = require('../config.js');

//-- Configure Knex Database ---------------------
module.exports = knex(knexConfig[config.DATABASE_ENVIRONMENT]);
