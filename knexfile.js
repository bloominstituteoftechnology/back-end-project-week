// Update with your config settings.
require('dotenv').config();

const pg = require('pg');
pg.defaults.ssl = true;

// const localPg = {
//   host: process.env.HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// };

module.exports = {
  development: {
    client: 'sqlite3',

    connection: { 
        filename: './database/notes.sqlite3' 
    }, 
    
    useNullAsDefault: true, 

    migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
    },

    seeds: {
        directory: './database/seeds' 
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASEURI,
    ssl: {
      rejectUnauthorized: false
    },
    migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
    },

    seeds: {
        directory: './database/seeds' 
    },
  }
};