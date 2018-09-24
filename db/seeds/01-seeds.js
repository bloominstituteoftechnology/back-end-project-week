
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Back-End-Project', content: 'Successful!'},
        {id: 2, title: 'Notes/Back-End', content: 'Look at all these notes.'},
        {id: 3, title: 'Nice one!', content: 'High five!!'}
      ]);
    });
};
