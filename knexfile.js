


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory:__dirname + './data/migrations',
      tableName: 'dbmigrations'
    },
    useNullAsDefault: true,
    seeds:{
      directory:__dirname +'./data/seeds'}
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: 'postgres://tzqredbemqcfwd:034ce9a63bfe5c6edf4cf768e7254d220ceb72748dd0edc0e4d5f0c3e966e608@ec2-54-83-44-4.compute-1.amazonaws.com:5432/d7uugijmmsfknm',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
