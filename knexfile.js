// const localpostgres = {
//   host: "localhost",
//   database: "pgNotes",
//   user: "Mr.Stegall",
//   password: "angela91"
// };

// const dbConnection = process.env.DATABASE_URL || localpostgres;

require('dotenv').config('/.env');

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/notes.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  // testing: {
  //   client: "sqlite3",
  //   connection: {
  //     filename: "./data/test.db3"
  //   },
  //   useNullAsDefault: true,
  //   migrations: {
  //     directory: "./data/migrations"
  //   },
  //   seeds: {
  //     directory: "./data/seeds"
  //   }
  // },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL,
      user: 'username',
      password: 'password'
    },
    pool: {
    min: 0,
    max: 15
  },
    migrations: {
      directory: "./data/migrations",
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./data/seeds"
    }
  }
}
