
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'rowValue1', password: 'password1'},
        {id: 2, username: 'rowValue2', password: 'password2'},
        {id: 3, username: 'rowValue3', password: 'password3'}
      ]);
    });
};
