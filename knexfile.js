// Update with your config settings.
require('dotenv').config();
const dbConnection = process.env.DATABASE_URL
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambdanotes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }

  }

};
