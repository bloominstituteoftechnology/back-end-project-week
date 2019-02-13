
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: test1, body: 'test1'},
        {title: test2, body: 'test2'},
        {title: test3, body: 'test3'}
      ]);
    });
};
