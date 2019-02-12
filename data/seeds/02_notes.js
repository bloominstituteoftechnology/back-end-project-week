
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {noteId: 1, userId: 1, title: 'rowValue1', textBody: "blah blah blah body here."},
        {noteId: 2, userId: 1, title: 'rowValue2', textBody: "blah blah blah body here."},
        {noteId: 3, userId: 1, title: 'rowValue3', textBody: "blah blah blah body here."}
      ]);
    });
};
