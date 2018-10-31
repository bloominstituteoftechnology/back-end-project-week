// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },
  production: {
    client: "pg",
    debug: true,
    connection: {
      database: "dcpi14lbs8cu46",
      user: "fnnrnqxshkodxc",
      password: "b3e1305ad99a3a1a19644f32823f421bc716ef99e30e2dec6af12b1669812646",
      host: "ec2-54-83-38-174.compute-1.amazonaws.com",
      uri: "postgres://fnnrnqxshkodxc:b3e1305ad99a3a1a19644f32823f421bc716ef99e30e2dec6af12b1669812646@ec2-54-83-38-174.compute-1.amazonaws.com:5432/dcpi14lbs8cu46"
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: "./db/seeds"
    },
    ssl: true
  }
};
