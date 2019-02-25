
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'rowValue1', body: 'Here is some text.'},
        {id: 2, title: 'rowValue2', body: 'Here is some text.'},
        {id: 3, title: 'rowValue3', body: 'Here is some text.'}
      ]);
    });
};
