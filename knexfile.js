// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'lambdaNotes',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/lambdaNotes.sqlite3'
    },
    useNullAsDefault: true,
    migration: {
      directory: './migrations'
    }
  }
};
