
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/lambda.sqlite3"
    },
    seeds: {
      directory: "./db/seeds"
    },
    useNullAsDefault: true
  }
};