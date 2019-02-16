
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tagNote').del()
    .then(function () {
      // Inserts seed entries
      return knex('tagNote').insert([
        {tag_id: 2, note_id: 4},
        {tag_id: 1, note_id: 3},
        {tag_id: 3, note_id: 1},
        {tag_id: 4, note_id: 4},
        {tag_id: 2, note_id: 5},
        {tag_id: 1, note_id: 2},
        {tag_id: 3, note_id: 2},
        {tag_id: 2, note_id: 1}
      ]);
    });
};
