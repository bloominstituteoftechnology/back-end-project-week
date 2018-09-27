// Update with your config settings.
require("dotenv").config();

const dbConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/db.sqlite3" }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },
  production: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
