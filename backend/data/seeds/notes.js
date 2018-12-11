
exports.seed = function (knex, Promise) {
  return knex('notes').truncate()
    .then(function () {
      return knex('notes').insert([
        { title: 'Title 1', content: 'Content 1' },
        { title: 'Title 2', content: 'Content 2' },
        { title: 'Title 3', content: 'Content 3' }
      ]);
    });
};
