exports.up = function(knex) {
  return knex.schema.createTable('posts', function(posts) {
    posts.increments();

    posts.string('title', 255).notNullable();
    posts.text('contents').notNullable();
    // posts.text('tags').notNullable();

    posts.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};