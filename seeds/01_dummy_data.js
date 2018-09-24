
exports.seed = function(knex, Promise) {
  return knex('notes')
    .del()
    .then(function () {
      return knex('notes').insert([
        {note_title: 'Testing 1', note_content: 'Testing 1'},
        {note_title: 'Lambda Notes', note_content: 'Front End'},
        {note_title: 'Lambda Notes', note_content: 'Back End'},
      ]);
    });
};
