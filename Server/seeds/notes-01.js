
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test 1', content: 'Notes hi 1'},
        {title: 'Test 2', content: 'Notes hi 2'},
        {title: 'Test 3', content: 'Notes hi 3'}
      ]);
    });
};