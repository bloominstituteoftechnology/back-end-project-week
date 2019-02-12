
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userId: 1, name: 'rowValue1'},
        {userId: 2, name: 'rowValue2'},
        {userId: 3, name: 'rowValue3'}
      ]);
    });
};
