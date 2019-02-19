
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'pass1' },
        {id: 2, username: 'user2', password: 'pass2' },
        {id: 3, username: 'user3', password: 'pass3' },
        {id: 4, username: 'user4', password: 'pass4' }
        {id: 5, username: 'user5', password: 'pass5' }
      ]);
    });
};
