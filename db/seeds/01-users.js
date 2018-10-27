
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstname: 'mike', lastname: 'kerbleski', password: 'password', username: 'mk'},
        {firstname: 'q', lastname: 'q', password: 'q', username: 'q'},
        {firstname: 'f', lastname: 'f', password: 'f', username: 'f'},
      ]);
    });
};
