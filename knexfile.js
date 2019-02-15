require('dotenv').config();
const localPg ={
  host: 'localHost',
  database:'lambda',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './data/testNotes.db3'
  //   },
  //   useNullAsDefault: true,
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   seeds: {
  //     directory: './data/seeds'
  //   }
  // },
  production: {
    client: 'pg',
    connection: dbConnection,
    pool:{
      min:2,
      max:10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  // testing: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './data/testNotes.db3',
  //   },
  //   useNullAsDefault: true,
  //   migrations: {
  //     directory: './data/migrations',
  //   },
  //   seeds: {
  //     directory: './data/seeds',
  //   },
  // },
};