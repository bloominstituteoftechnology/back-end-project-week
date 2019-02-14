module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/notes.db' },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './data/seeds' },
  },
};