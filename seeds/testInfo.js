
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Note1', noteBody: "textbody1"},
        {id: 2, title: 'Note2', noteBody: "textbody2"},
        {id: 3, title: 'Note3', noteBody: "textbody3"}
      ]);
    });
};
