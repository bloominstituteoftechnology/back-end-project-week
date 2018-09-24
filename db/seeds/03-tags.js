
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag_title: 'test', noteId: 1},
        {tag_title: 'test2', noteId: 1}
      ]);
    });
};
