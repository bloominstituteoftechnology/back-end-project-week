
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes_tags').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes_tags').insert([
        {notes_id: 1, tags_id: 1},
        {notes_id: 2, tags_id: 2},
        {notes_id: 3, tags_id: 3}
      ]);
    });
};
