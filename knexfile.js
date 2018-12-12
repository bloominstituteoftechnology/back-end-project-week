require('dotenv').config();

const localPgConnection = {
  host: 'localhost', // address to find the db server
  database: 'lambda',
  user: 'brandon',
  password: 'pass'
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;
// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    debug: true
  },
  production: {
    client: 'pg',
    connection: dbConnection + '?ssl=true', // can be and object or a string
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    debug: true
  }
};
