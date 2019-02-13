
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Note1', body: 'Body1'},
        {id: 2, title: 'Note2', body: 'Body2'},
        {id: 3, title: 'Note3', body: 'Body3'}
      ]);
    });
};
