
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test 1', textBody: 'Notes hi 1'},
        {title: 'Test 2', textBody: 'Notes hi 2'},
        {title: 'Test 3', textBody: 'Notes hi 3'}
      ]);
    });
};