
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {noteId: 1, tag: 'Tag Test 1'},
        {noteId: 2, tag: 'Tag Test 2'},
        {noteId: 3, tag: 'Tag Test 3'}
      ]);
    });
};
