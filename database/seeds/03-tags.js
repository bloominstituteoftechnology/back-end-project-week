
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, tag: 'Lorem'},
        {id: 2, tag: 'Ipsum'},
        {id: 3, tag: 'Dolor'}
      ]);
    });
};
