// Update with your config settings.
if (process.env.ENVIRONMENT != 'production') {
  require('dotenv').config();
}

const dbConnection = process.env.DATABASE_URL || 'development';

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: process.env.USER,     
      password: process.env.PASSOWRD,
      database: process.env.DATABASE,
      charset: 'utf8',
    },	  
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',	  
  },
      seeds: { directory: './data/seeds' },
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
    connection:dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',	    
    },
    seeds: { directory: './data/seeds' },	  
  }

};
