
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, username: 'ka', password: 'sd'},
        {id: 2, username: 'k', password: 'i'},
        {id: 3, username: 'a', password: 'b'}
      ]).returning('*');
    });
};
