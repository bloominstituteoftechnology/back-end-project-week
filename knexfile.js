const localPgConnection = {
  host: "",
  database: "",
  user: "",
  password: ""
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/dev.sqlite3"
    },
    useNullAsDefault: true, //not needed for production, only sqlite3
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: dbConnection, // can be an object or a string
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
