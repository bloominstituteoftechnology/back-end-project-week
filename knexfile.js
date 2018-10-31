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
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      url: process.env.DATABASE_URL,
      schema: "public"
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
