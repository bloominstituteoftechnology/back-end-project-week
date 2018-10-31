
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Woah', content: 'Cool'},
        { title: 'Now', content: 'Awesome'},
        { title: 'Long Walks', content: 'On Beach'}
      ]);
    });
};
