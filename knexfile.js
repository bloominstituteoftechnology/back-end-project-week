var pg = require('pg');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    useNullAsDefault: true,
    seeds:{
      directory:'./data/seeds'}
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
    client:'pg',
    connection: 'postgres://hmizbiqjgkyucy:9829613e1f3841cd456033ac59fdc8a194e9952d9caf4b9d1291f72696f3be11@ec2-54-243-128-95.compute-1.amazonaws.com:5432/d4g1jqp77fl7sa',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    
  }

};
