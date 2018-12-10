
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'andre', password:"pass"},
        {id: 2, username: 'andre1', password:"pass"},
      ]);
    });
};
