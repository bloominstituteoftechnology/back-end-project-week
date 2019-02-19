// Update with your config settings.

const localPgConnection = {
  host: 'localhost',
  database: 'prod',
  user: 'notes',
  password: 'blah1234',
}

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
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
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

};
