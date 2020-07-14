
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('List_Notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('List_notes').insert([
        {list_id: 1, notes_id: 1},
        {list_id: 1, notes_id: 2},
        {list_id: 1, notes_id: 3}
      ]);
    });
};
