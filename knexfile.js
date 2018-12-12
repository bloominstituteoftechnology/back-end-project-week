const localPgConnection = {
  host: "localhost",
  database: "lambda",
  user: "luis",
  password: "pass"
};

// DATABASE_URL provided by heroku after added postgres
const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lambda.sqlite3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true // only used for sqlite3, not needed for production
  },
  production: {
    client: "pg",
    connection: dbConnection, //can be an object or a string
    pool: {
      //default, may be given different values by db admin
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations", // default, created even if it's not listed in original migrations
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
