// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambdaNotes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tablename: 'dbmigrations',
    },
    seeds: { directory: './data/seeds'}
  },

  production: {
    client: 'pg',
    connection: 'connection string provided by heroku',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tablename: 'dbmigrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
