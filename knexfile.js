// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './sqlite3'
    }
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations'
  }
};
