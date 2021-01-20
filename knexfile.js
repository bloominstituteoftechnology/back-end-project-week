// Update with your config settings.
require('dotenv').config();

const dbConnection = process.env.DATABASE_URL;

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