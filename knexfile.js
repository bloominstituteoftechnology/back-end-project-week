// Update with your config settings.
const localPgConnection ={
  host: 'localhost',
  database: 'lambda',
  user: 'pedro',
  password: 'pass',
}

const dbConnection = process.env.DATABASE_URL || localPgConnection
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
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
    },
  }
};