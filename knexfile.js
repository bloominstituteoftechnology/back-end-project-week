module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    production: {
      client: 'pg',
      connection: dbCOnnection,
      ssl: true,
      pool: {
        min: 2,
        max: 10
      }
    }
  }
};
