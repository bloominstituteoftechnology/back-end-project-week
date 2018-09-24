// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/notes.sqlite3',
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: function(conn, done) {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './db/migratinos',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
