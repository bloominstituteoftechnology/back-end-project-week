
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'rowValue1', content:"test", user_id: 1},
        {id: 2, title: 'rowValue2', content:"test", user_id: 1},
        {id: 3, title: 'rowValue3', content:"test", user_id: 1},
        {id: 4, title: 'rowValue4', content:"test", user_id: 2},
        {id: 5, title: 'rowValue5', content:"test", user_id: 2},
        {id: 6, title: 'rowValue6', content:"test", user_id: 2},
      ]);
    });
};
