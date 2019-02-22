const dbEnvironment = "development";
const knex = require("knex");

const knexConfig = require("../knexfile.js")[dbEnvironment];

module.exports = knex(knexConfig);
