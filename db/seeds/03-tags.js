
exports.seed = function(knex, Promise) {
  return knex('tags').del()
    .then(function () {
      return knex('tags').insert([
        {tag_title: 'INIT', noteId: 1}
      ]);
    });
};
