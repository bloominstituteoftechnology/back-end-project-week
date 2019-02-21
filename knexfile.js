// Update with your config settings.

//Allow use of .env file - environment variables
require('dotenv').config();

//local connection object
const localPg = {
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'pg',
    // connection: 'postgres://cferrell2:meuamor1@localhost/lambdanotes',
    connection: `postgres://${localPg.user}:${localPg.password}@${localPg.host}/${localPg.database}`,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  
  production: {
    client: 'pg',   
    connection: dbConnection,   //an object or a string
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/data/migrations'
    },
    seeds: {
      directory: __dirname + '/data/seeds'
    }
  }
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },


};
