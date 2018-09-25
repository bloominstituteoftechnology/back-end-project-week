
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'note 1', content: 'rowValue1' },
        { title: 'note 2', content: 'rowValue2' },
        { title: 'note 3', content: 'rowValue3' }
      ]);
    });
};
