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
      directory: './db/seeds',
    }
  },
  production: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL || 'postgres://uegefrgadgkgcv:48a51e273b0fc599dbdd1476d7bbfcf430f6dc10a284b1c7b9d4d77d29f3c4e0@ec2-107-21-98-165.compute-1.amazonaws.com:5432/dlhrvbdjg7ads',
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: './db/seeds',
    },
    ssl: true
  }
};