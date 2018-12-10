// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/lambdaNotes.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
