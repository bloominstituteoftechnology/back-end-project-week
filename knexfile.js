// Update with your config settings.

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
    connection:
      process.env.DATABASE_URL ,
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
