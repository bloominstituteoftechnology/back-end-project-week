// Update with your config settings.
require('dotenv').config();

const localPgConnection = {
  host: 'localhost', // address to find the db server
  database: 'notes',
  user: 'Bryan',
  password: 'pass',
};

const dbConnection = process.env.DATABASE_URL || localPgConnection

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
