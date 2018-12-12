// Update with your config settings.
const localPgConnection = {
  host: "localhost", // address to find the db server
  database: "lambda",
  user: "luis",
  password: "pass"
};

// where is DATABASE_URL coming from?
const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/lambdaNotes.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: dbConnection, // can be and object or a string
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
