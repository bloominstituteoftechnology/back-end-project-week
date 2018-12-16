const dbEnvironment = process.env.DB_ENVIRONMENT || "development";

const knex = require("knex");
const knexConfig = require("../knexfile");
console.log(dbEnvironment);
module.exports = knex(knexConfig[dbEnvironment]);
