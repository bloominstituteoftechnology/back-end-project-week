// Update with your config settings.

const localPgConnection = {
  host: 'localhost', // address to find the db server
  database: 'lambda',
  user: 'edward',
  password: 'pass',
};

// where is DATABASE_URL coming from?
const dbConnection = process.env.DATABASE_URL || localPgConnection;


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
 
  },

  production: {
    client: 'pg',
    connection: dbConnection, // can be and object or a string
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
