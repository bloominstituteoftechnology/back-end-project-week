const knex = require('knex');
const cfg = require('../knexfile');

module.exports = knex(cfg.development);