
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('note_table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('note_table').insert([
        {note_title: 'title 1', note_body: 'dummy note a'},
        {note_title: 'title 2', note_body: 'dummy note b '},
        {note_title: 'title 3', note_body: 'dummy note c'}
      ]);
    });
};
