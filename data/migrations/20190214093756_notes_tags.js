
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes_tags', table => {
      table.increments();
      table.integer('notes_id').unsigned();
      table.foreign('notes_id').references('id').on('notes');
      table.integer('tags_id').unsigned();
      table.foreign('tags_id').references('id').on('tags');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes_tags');
};
