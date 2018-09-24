// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/lambdanotes.sqlite3'
    },
    useNullAsDefault: true,
  },
};
