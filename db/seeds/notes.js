
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Test1', content: 'this is the first test'},
        {id: 2, title: 'Finish project', content: 'remember how to work in react'},
        {id: 3, title: 'Todo', content: 'take a shower'},
      ]);
    });
};
