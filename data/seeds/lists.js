
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('lists').insert([
        {id: 1, list: '[1,2,3]', listTitle: 'List1', notes_id: 1, users_id: 1},
        {id: 2, list: '[4,5,6]', listTitle: 'List2', notes_id: 2, users_id: 1},
        {id: 3, list: '[1,2,3]', listTitle: 'List3', notes_id: 3, users_id: 1},
        {id: 4, list: '[4,5,6]', listTitle: 'List4', notes_id: 1, users_id: 2},
        {id: 5, list: '[1,2,3, 4, 5]', listTitle: 'List5', notes_id: 2, users_id: 2},
        {id: 6, list: '[7,8,9]', listTitle: 'List6', notes_id: 3, users_id: 2},
        {id: 7, list: '[1,2,3]', listTitle: 'List7', notes_id: 1, users_id: 3},
        {id: 8, list: '[1,5,10]', listTitle: 'List8', notes_id: 2, users_id: 3},
        {id: 9, list: '[1,2,3]', listTitle: 'List9', notes_id: 3, users_id: 3}
      ]);
    });
};
