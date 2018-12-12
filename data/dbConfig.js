const knex = require("knex");
const dbEnvironment = process.env.DB_ENVIRONMENT || "development";
const knexConfig = require("../knexfile.js")[dbEnvironment];

module.exports = knex(knexConfig);
