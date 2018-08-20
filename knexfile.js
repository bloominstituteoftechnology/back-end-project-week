module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda_notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'lambda_nots_migrations'
    }
  }
};
