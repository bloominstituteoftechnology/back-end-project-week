
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'First Note', content: 'Note Text'},
        {id: 2, title: 'Second Note', content: 'Note Text' },
        {id: 3, title: 'Third Note', content: 'Note Text'}
      ]);
    });
};
