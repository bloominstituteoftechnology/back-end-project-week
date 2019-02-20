// const localpostgres = {
//   host: "localhost",
//   database: "pgNotes",
//   user: "Mr.Stegall",
//   password: "angela91"
// };

const dbConnection = process.env.DATABASE_URL || localpostgres;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/notes.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
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
    connection: dbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
