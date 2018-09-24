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
      directory: './db/seeds',
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL || 'my_db',
      user:     'kamal',
      password: 'rando'
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: './db/seeds',
    }
  }
};