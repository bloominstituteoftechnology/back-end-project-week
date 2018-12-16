const dbEnvironment = process.env.DB_ENVIRONMENT || "production";

const knex = require("knex");
const knexConfig = require("../knexfile");
console.log(dbEnvironment);
module.exports = knex(knexConfig[dbEnvironment]);
