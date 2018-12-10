
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'this is a note title 1', textBody: 'this is the note text body 1'},
        {id: 2, title: 'this is a note title 2', textBody: 'this is the note text body 2'},
        {id: 3, title: 'this is a note title 3', textBody: 'this is the note text body 3'},
        {id: 4, title: 'this is a note title 4', textBody: 'this is the note text body 4'},
      ]);
    });
};
