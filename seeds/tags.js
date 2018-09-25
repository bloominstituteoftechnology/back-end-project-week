
exports.seed = function(knex, Promise) {
  return knex('tags').del()
    .then(function () {
      return knex('tags').insert([
        {id: 1, tag: 'sample tag', noteId: 1},
        {id: 2, tag: 'tag', noteId: 1},
        {id: 3, tag: 'moretag', noteId: 3},
      ]);
    });
};
