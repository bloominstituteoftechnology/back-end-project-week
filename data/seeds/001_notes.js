
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Test one', content: 'This is the first test'},
        {id: 2, title: 'Test Two', content: 'This is the second test'},
        {id: 3, title: 'Test Three', content: 'This is the third test'}
      ]);
    });
};
