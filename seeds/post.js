
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        {userId: 1, title: 'Title 1', textBody: 'content 1'},
        {userId: 2, title: 'Title 2', textBody: 'content 2'},
        {userId: 3, title: 'Title 33', textBody: 'content 3'}
      ]);
    });
};
