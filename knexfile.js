// Update with your config settings.
require("dotenv").config();
const localPg = {
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};
const dbConnection = process.env.DATABASE_URL|| localPg; 

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },
  production: {
    client: "pg",
    debug: true,
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: "./db/seeds"
    },
    ssl: true
  }
};
