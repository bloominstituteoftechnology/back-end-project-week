
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts_tags').insert([
        {id: 1, postId: 1, tagId: 3},
        {id: 2, postId: 1, tagId: 4},
        {id: 3, postId: 2, tagId: 2},
        {id: 4, postId: 2, tagId: 3},
        {id: 5, postId: 3, tagId: 1},
        {id: 6, postId: 3, tagId: 2}
      ]);
    });
};
