
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {noteId: 1, tagId: 1},
        {noteId: 2, tagId: 2},
        {noteId: 3, tagId: 3}
      ]);
    });
};
