
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstname: 'mike', lastname: 'kerbleski', password: 'password', username: 'mk'},
        {firstname: 'q', lastname: 'q', password: 'q', username: 'q'}
      ]);
    });
};
