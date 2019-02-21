
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Note 1', content:'This is a test note.'},
        {title: 'Note 2', content:'This is another test note #2 that I made up for testing.'},
        {title: 'Note 3', content:'This is another test note #3 that I created and it contains more text than usual.'}
      ]);
    });
};
