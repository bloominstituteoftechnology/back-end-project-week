require('dotenv').config();
const localPg = {
  host: process.env.DB_HOST,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
const dbConnection = process.env.DATABASE_URL || localPg;
console.log(`\n\n ${dbConnection} \n\n`);

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/lambda.sqlite3'
    },
    migrations: {
      tableName: "notes",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds"
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "notes",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
