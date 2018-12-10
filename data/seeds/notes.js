exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Test Note 1', body: 'This is test note 1' },
        { title: 'Test Note 2', body: 'This is test note 2' },
        { title: 'Test Note 3', body: 'This is test note 3' }
      ]);
    });
};
