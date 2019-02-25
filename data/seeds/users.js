
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Willie', password: '55555'},
        {id: 2, username: 'Marlo', password: '55555'},
        {id: 3, username: 'John Doe', password: '55555'}
      ]);
    });
};
