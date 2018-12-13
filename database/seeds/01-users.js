const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      userId: 1, 
      username: 'rey',
      password: bcrypt.hashSync('pass', 8)
    },
  ]);
};
