
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Andre', password: "pass"},
        {id: 2, username: 'alsoAndre', password: "pass"},
        {id: 3, username: 'someoneElse', password: "pass"},
        {id: 4, username: 'anotherGuy', password: "pass"},
      ]);
    });
};