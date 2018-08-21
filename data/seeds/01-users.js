
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'DirupT', password: 'test' },
        { username: 'test', password: 'test' },
        { username: 'test1', password: 'test' },
      ]);
    });
};
