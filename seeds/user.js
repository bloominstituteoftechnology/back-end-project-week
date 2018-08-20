
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: 'user 1', password: 'password1'},
        {username: 'user 2', password: 'password2'},
        {username: 'user 3', password: 'password3'}
      ]);
    });
};
