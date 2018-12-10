const knex = require("knex");
const knexConfig = require("../knexfile.js").development;

module.exports = knex(knexConfig);
