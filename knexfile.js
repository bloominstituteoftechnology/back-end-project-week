// Update with your config settings.

const localPgConnection = {
  host: 'localhost',
  database: 'lambda',
  user: 'mckay',
  password: 'password'
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }

};
