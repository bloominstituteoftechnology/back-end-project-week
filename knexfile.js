// Update with your config settings.
const localPgconnection = {
  host: 'localhost',
  database: 'lambda',
  user: 'yanrong',
  password: 'pass'
}

// where is DA
const dbConnection = process.env.DATABASE_URL || localPgconnection;
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds'
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
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
