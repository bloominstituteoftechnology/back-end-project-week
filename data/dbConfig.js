const knex = require("knex");

const dbEnvironment = process.env.DB_ENVIRONMENT || "development";
const knexConfig = require("../knexfile")[dbEnvironment];

module.exports = knex(knexConfig);
