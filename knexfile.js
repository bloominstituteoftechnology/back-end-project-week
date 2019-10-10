
require('dotenv').config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/app-db.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
    min: 0,
    max: 15
  },
    migrations: {
      directory: "./data/migrations",
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./data/seeds"
    }
  }
}
