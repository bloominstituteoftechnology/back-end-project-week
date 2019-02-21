// const localpostgres = {
//   host: "localhost",
//   database: "pgNotes",
//   user: "Mr.Stegall",
//   password: "angela91"
// };

// const dbConnection = process.env.DATABASE_URL || localpostgres;

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
    client: 'postgresql',
    connection: {
      database: 'postgres://icmveonkwqjdmk:2b75738b9a60d7904542b802fb7cf0e1016aa94dc99ffcb21b838b01c8796c44@ec2-54-204-41-109.compute-1.amazonaws.com:5432/da0c07gtdf3c6o',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
