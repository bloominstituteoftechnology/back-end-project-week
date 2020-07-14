
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Sam Khaled'},
        {id: 2, name: 'John Doe'},
        {id: 3, name: 'Jane Doe'}
      ]);
    });
};
