
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'wow', content: 'rowValue1'},
        {title: 'this is awesome', content: 'rowValue2'},
        {title: 'look at me', content: 'rowValue3'}
      ]);
    });
};
