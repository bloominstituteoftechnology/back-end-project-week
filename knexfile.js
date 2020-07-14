// Update with your config settings.
const localPgConnection = {
  host: 'localhost',
  database: 'lambda',
  user: 'bg',
  pass: 'pass',
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
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
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  },
};
