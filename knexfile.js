// Update with your config settings.
const localPgConnection = {
  host: "localhost", // address to find the db server
  database: "lambda",
  user: "gabe",
  password: "pass"
};

// Where is DATABASE_URL coming from?
const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: dbConnection, //can be an object or a string
    pool: {
      mind: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
