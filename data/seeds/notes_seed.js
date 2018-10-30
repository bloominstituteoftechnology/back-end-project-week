
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Test Note 1', content: 'Test note 1.'},
        {id: 2, title: 'Test Note 2', content: 'Test note 2.'},
        {id: 3, title: 'Test Note 3', content: 'Test note 3.'},
        {id: 4, title: 'Test Note 4', content: 'Test note 4.'},
        {id: 5, title: 'Very Creative Names So Far!', content: 'COMBO BREAKER'}
      ]);
    });
};
