
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'Alberto Funk', password: 'You will never know'},
        {username: 'Dee Reynolds', password: 'THE Password'}
      ]);
    });
};
