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
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL || 'my_db',
      user:     'uegefrgadgkgcv',
      password: '48a51e273b0fc599dbdd1476d7bbfcf430f6dc10a284b1c7b9d4d77d29f3c4e0'
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "dbMigrations"
    },
    seeds: {
      directory: './db/seeds',
    }
  }
};