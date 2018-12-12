// Update with your config settings.
const localPgConnection = {
  host: '',
  database: 'my_db',
  user:     'username',
  password: 'password'
}

const dbConnection = process.env.DATABASE_URL || localPgConnection
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: dbConnection,
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};