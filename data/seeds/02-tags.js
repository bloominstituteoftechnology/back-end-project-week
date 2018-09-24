exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tags').insert([
        { id: 1, title: 'JavaScript' },
        { id: 2, title: 'Python' },
        { id: 3, title: 'C' }
      ]);
    });
};
