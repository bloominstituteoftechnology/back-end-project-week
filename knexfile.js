const localPgConnection = {
  host: 'localhost', // address to find the db server
  database: 'lambda',
  user: 'angelo',
  password: 'pass',
};

// where is DATABASE_URL comign from?
const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    }
  },


  production: {
    client: 'pg',
    connection: dbConnection,
    },
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
  }