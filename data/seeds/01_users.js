users
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'xxD4Dxx'},
        {id: 2, username: 'JDoe438'},
        {id: 3, username: 'TEST_USER'}
      ]);
    });
};//seeds currently unusable until find a way to add encrypted password
