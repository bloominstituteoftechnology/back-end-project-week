//* Must have for connection
const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile");
const knex = require("knex");

module.exports = knex(config.production);
