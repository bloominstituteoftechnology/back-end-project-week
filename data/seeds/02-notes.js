
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test 1', content:"test note 1"},
        {title: 'Test 2', content:"test note 2"},
      ]);
    });
};
