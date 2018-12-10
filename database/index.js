

//== Knex Database =============================================================

//-- Dependencies --------------------------------
const knex = require('knex');
const knexConfig = require('../knexfile.js');

//-- Configure Knex Database ---------------------
module.exports = knex(knexConfig.development);
