
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 1, textBody: 'rowValue1'},
        {title: 2, textBody: 'rowValue2'},
        {title: 3, textBody: 'rowValue3'}
      ]);
    });
};
