
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: '1234'},
        {username: 'user2', password: '1234'}
      ]);
    });
};
