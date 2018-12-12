require('dotenv').config();

const localPg = {
  host: 'localhost',
  database: process.env.DB_NAME, // address to find the db server
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const dbConnection = process.env.DATABASE_URL || localPg;

// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg', //yarn add pg
    connection: dbConnection, //  connection can be an object or a string

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
