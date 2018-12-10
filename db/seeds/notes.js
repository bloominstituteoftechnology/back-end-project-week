
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'rowValue1', content: 'rowValue1, content', author: 'rowValue1'},
        {id: 2, title: 'rowValue2', content: 'rowValue2, content', author: 'rowValue2'},
        {id: 3, title: 'rowValue3', content: 'rowValue3, content', author: 'rowValue3'}
      ]);
    });
};
