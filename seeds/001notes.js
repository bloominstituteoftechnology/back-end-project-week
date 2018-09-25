
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'title1', content: 'body body body body'},
        {id: 2, title: 'title2', content: 'body body body body body'},
        {id: 3, title: 'title3', content: 'body body body body body body'},
        {id: 4, title: 'title4', content: 'body body body body body body body'},
        {id: 5, title: 'title5', content: 'body body body body body body body body'}
      ]);
    });
};
