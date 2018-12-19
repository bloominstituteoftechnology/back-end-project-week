exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { id: 1, title: 'Banksy Note 1', textBody: 'Banksy First Task 1', user_id: 1 },
        { id: 2, title: 'Kimura Note 1', textBody: 'Kimura First Task 1', user_id: 2 },
        { id: 3, title: 'Brooklyn Note 1', textBody: 'Brooklyn First Task 1', user_id: 3 }
      ]);
    });
};
