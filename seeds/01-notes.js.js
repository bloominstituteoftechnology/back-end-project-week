
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, title: 'First note title', description: 'I am describing the first note'},
        {id: 2, title: 'Second note title', description: 'I am describing the second note'},
        {id: 3, title: 'Third note title', description: 'I am describing the third note'}
      ]);
    });
};
