// Update with your config settings.
require('dotenv').config('/.env');

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
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "./data/migrations",
  
    seeds: {
      directory: __dirname +'./data/seeds'
    }
  }

};
