
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'note1', content: 'content 1'},
        {id: 2, title: 'note2', content: 'content 2'},
        {id: 3, title: 'note3', content: 'content 3'}
      ]);
    });
};
