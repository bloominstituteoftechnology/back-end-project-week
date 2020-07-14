
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Back-End-Project', body: 'Successful!'},
        {id: 2, title: 'Notes/Back-End', body: 'Look at all these notes.'},
        {id: 3, title: 'Nice one!', body: 'High five!!'}
      ]);
    });
};
