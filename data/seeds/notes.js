
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Woah', content: 'Cool'},
        {id: 2, title: 'Now', content: 'Awesome'},
        {id: 3, title: 'Long Walks', content: 'On Beach'}
      ]);
    });
};
