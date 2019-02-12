
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('lists').insert([
        {id: 1, list: 'List1', notes_id: 1, users_id: 1},
        {id: 2, list: 'List2', notes_id: 2, users_id: 2},
        {id: 3, list: 'List3', notes_id: 3, users_id: 1}
      ]);
    });
};
