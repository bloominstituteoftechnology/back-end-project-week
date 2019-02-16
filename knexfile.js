module.exports = {
  client: 'pg',
  debug: true,
  connection: DB_URL,
  migrations:  {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds'
  },
  ssl: true,
}