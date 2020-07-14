
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Shopping List', content: 'eggs, cheese, steak'},
        {id: 2, title: 'Chores', content: 'yardwork, clean house'},
        {id: 3, title: 'Todo', content: 'finish lambda backend'},
      ]);
    });
};
