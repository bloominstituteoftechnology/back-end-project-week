// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dataBase/lambda.sqlite3'
    }, 
    useNullAsDefault: true,
    migrations: {
      directory: './dataBase/migrations',
      tableName: 'dbmigrations',
    },
    seeds: {
      directory: './dataBase/seeds'
    }
  },

};
