exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts_tags_links', tbl => {
    tbl.increments('id');

    tbl.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE');
    
    tbl.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts_tags_links');
};
