
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, tag: 'Music'},
        {id: 2, tag: 'Dance'},
        {id: 3, tag: 'Theatre'},
        {id: 4, tag: 'Cinema'},
        {id: 5, tag: 'Commedy'}
      ]);
    });
};
