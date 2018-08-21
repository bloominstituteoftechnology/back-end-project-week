exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1,
          username: 'rowValue1',
          password: 'password',
          noteOrdering: '[2, 1, 3]' }
      ]);
    });
};
