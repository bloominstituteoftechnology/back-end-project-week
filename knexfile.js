// Update with your config settings.
require('dotenv').config();

// const localPg = {
//   host: process.env.HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// };

const dbConnection = process.env.DATABASEURI;

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
    connection: dbConnection,
    migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
    },

    seeds: {
        directory: './database/seeds' 
    },
  }
};