// Update with your config settings.
localdbConnector = {
  client: 'localhost',
  database: 'notes',
  user: 'jbrock',
  password: 'Letmein'
}
const dbConnector = process.env.DATABASE_URL || localdbConnector;
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/Migrations'
    },
    seeds: {
      directory: './data/Seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: dbConnector,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/Migrations'
    },
    seeds: {
      directory: './data/Seeds'
    }
  }

};
