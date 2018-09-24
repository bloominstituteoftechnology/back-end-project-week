
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test Title 1', content:'Test Note 1'},
        {title: 'Test Title 2', content:'Test Note 2'},
        {title: 'Test Title 3', content:'Test Note 3'}
      ]);
    });
};
