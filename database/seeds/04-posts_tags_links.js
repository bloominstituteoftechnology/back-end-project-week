
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts_tags_links').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts_tags_links').insert([
        {id: 1, post_id: 1, tag_id: 3},
        {id: 2, post_id: 2, tag_id: 2},
        {id: 3, post_id: 3, tag_id: 1},
        {id: 4, post_id: 3, tag_id: 2},
      ]);
    });
};
