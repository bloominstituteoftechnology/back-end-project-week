
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('note').del()
    .then(function () {
      // Inserts seed entries
      return knex('note').insert([
        {id: 1, title: 'Note # 1', content: 'content # 1'},
        {id: 2, title: 'Note # 2', content: 'content # 2'},
        {id: 3, title: 'Note # 3', content: 'content # 3'}
      ]);
    });
};
