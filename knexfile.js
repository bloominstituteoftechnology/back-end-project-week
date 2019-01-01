// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/backend.sqlite3'
    },
    useNullAsDefault: true
  },
production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    },
    useNullAsDefault: true
  }
};