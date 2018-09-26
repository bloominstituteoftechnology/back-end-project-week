// Update with your config settings.
require('dotenv').config();
const localPg = {
  host: 'localhost',
  database: 'lambda',
  user: 'luis',
  password: 'pass',
};
const dbConnection = process.env.DATABASE_URL || localPg;
console.log(`\n\n ${dbConnection} \n\n`);

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    useNullAsDefault: true,
  },
};
