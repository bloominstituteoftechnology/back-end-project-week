const DATABASE_URL = process.env.DATABASE_URL
module.exports = {
  client: 'pg',
  debug: true,
  connection: DATABASE_URL,
  migrations:  {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds'
  },
  ssl: true,
}