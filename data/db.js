const config = require("../knexfile");
// const knex = require("knex");

const options =
  process.env.NODE_ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL,
        searchPath: ["public"]
      }
    : {};

const knex = require("knex")(options);

// module.exports = knex(config.production);
