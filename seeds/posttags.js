
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posttags').del()
    .then(function () {
      // Inserts seed entries
      return knex('posttags').insert([
        {postId: 1, tagId: 2},
        {postId: 2, tagId: 3},
        {postId: 3, tagId: 1}
      ]);
    });
};
