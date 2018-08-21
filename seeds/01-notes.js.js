
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'First note title', textBody: 'I am describing the first note'},
        {id: 2, title: 'Second note title', textBody: 'I am describing the second note'},
        {id: 3, title: 'Third note title', textBody: 'I am describing the third note'}
      ]);
    });
};
