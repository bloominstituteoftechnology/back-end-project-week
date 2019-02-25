// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './lambdanotesDB.sqlite3'
    
  },
  useNullAsDefault: true,

  migrations: {
      directory: './Data/Migrations'
    },
  seeds: {
      directory: './Data/Seeds'
  }
},
};
