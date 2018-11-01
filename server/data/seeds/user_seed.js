
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_table').insert([
        {username: 'user1', password: 'test1'},
        {username: 'user2', password: 'test2'},
        {username: 'user3', password: 'test3'}
      ]);
    });
};
