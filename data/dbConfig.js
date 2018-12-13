const knex = require("knex");

// const config = require("../knexfile").development;
//.development can be written also as ['development']
//can also use this to say ['production'] instead

const dbEnvironment = process.env.DB_ENVIRONMENT || "development";

// will dynamically use env file environment if it exists (we create it on heroku in config vars), otherwise uses local sqlite
const config = require("../knexfile")[dbEnvironment];
module.exports = knex(config);
