const knex = require("knex");

const KnexConfig = require("../knexfile");

module.exports = knex(KnexConfig.development);
