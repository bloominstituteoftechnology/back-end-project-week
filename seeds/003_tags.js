
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {note_id: 1, tag: 'todo'},
        {note_id: 1, tag: 'wisdom'},
        {note_id: 2, tag: 'todo'},
        {note_id: 2, tag: 'wisdom'},
        {note_id: 3, tag: 'nonsense'}
      ]);
    });
};
