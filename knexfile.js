// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambdaNotes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  // production : {
  //   client: 'pg',
  //   connection: {// can be an object or a string
  //     host: '', // address to find the db server
  //     database: '',
  //     user: '',
  //     password: ''
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   seeds: {
  //     directory: './data/seeds'
  //   }
  // }
};
