const localPgConnection = { // can be object or string
  host: 'localhost', // address to find the db server
  database: 'keep',
  user:     'username',
  password: 'password'
}

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: { directory: './database/migrations'},
    seeds: { directory: './database/seeds'},
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: { directory: './database/migrations'},
    seeds: { directory: './database/seeds'},
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
