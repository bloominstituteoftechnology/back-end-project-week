exports.seed = function(knex, Promise) {
  return knex('notes').insert([
    {noteId: 0, title: 'this is a note title 1', textBody: 'this is the note text body 1', user: 0},
    {noteId: 1, title: 'this is a note title 2', textBody: 'this is the note text body 2', user: 0},
    {noteId: 2, title: 'this is a note title 3', textBody: 'this is the note text body 3', user: 0},
    {noteId: 3, title: 'this is a note title 4', textBody: 'this is the note text body 4', user: 0},
  ]);
};
