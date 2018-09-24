// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './Database/Migrations',
      tableName: 'databasemigrations',
  },
    seeds: { directory: './Database/Seeds' },
  }
};
