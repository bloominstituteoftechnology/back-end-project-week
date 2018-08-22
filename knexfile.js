// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/notes.sqlite3"
    },
    useNullAsDefault: true
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "dcm0572f53nf1t",
  //     user: "zpuhklwvlraxkl",
  //     password:
  //       "62ecc2d3debd4c768f754dae97bdff080a5e2f922d692456f73054a135b2026a",
  //     DATABASE_URL:
  //       "postgres://zpuhklwvlraxkl:62ecc2d3debd4c768f754dae97bdff080a5e2f922d692456f73054a135b2026a@ec2-50-16-196-138.compute-1.amazonaws.com:5432/dcm0572f53nf1t"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },
  // useNullAsDefault: true
};
