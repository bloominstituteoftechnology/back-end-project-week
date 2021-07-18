
require('dotenv').config({path: '.env'});
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lbNotes.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.HEROKU_POSTGRESQL_ROSE_URL,
    // ssl: { rejectUnauthorized: false },
    pool: {
      min: 2, 
      max: 10
    },
    migrations: {

      directory:  './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
