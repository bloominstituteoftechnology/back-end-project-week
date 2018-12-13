require("dotenv").config();
const dbConnection = process.env.DATABASE_URL;
module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/lambdaNotes.sqlite3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};
