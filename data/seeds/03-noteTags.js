
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('note_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('note_tags').insert([
        {noteId: 1, tagId: 1},
        {noteId: 1, tagId: 2},
        {noteId: 1, tagId: 3},
        {noteId: 2, tagId: 4},
        {noteId: 2, tagId: 5},
        {noteId: 2, tagId: 6},
        {noteId: 3, tagId: 7},
        {noteId: 3, tagId: 8},
        {noteId: 3, tagId: 9},
        {noteId: 4, tagId: 10},
        {noteId: 4, tagId: 11},
        {noteId: 4, tagId: 12},
        {noteId: 5, tagId: 13},
        {noteId: 5, tagId: 14},
        {noteId: 5, tagId: 15},
        {noteId: 6, tagId: 16},
        {noteId: 6, tagId: 17},
        {noteId: 6, tagId: 18}
      ]);
    });
};
