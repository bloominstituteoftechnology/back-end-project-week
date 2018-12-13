const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      userId: 0, 
      username: 'rey',
      password: bcrypt.hashSync('pass', 8)
    },
  ]);
};
