const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 1, 
      username: 'rey',
      password: bcrypt.hashSync('pass', 8)
    },
  ]);
};
