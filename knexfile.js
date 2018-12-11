// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database:
        'postgres://cycqcgrxyznfok:ecc1784ecc3573eb3df95815c18eefc4063c7b73153feaee2e5e6f3da49548cc@ec2-54-163-245-64.compute-1.amazonaws.com:5432/d12idh0ar7rmnq',
      user: 'username',
      password: 'password'
    }
  }
};
