
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'INIT', password: 'You will never know'}
      ]);
    });
};
