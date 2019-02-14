
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes_tags', table => {
      table.increments();
      table.integer('notes_id').unsigned()
      .references('id').inTable('notes');
      table.integer('tags_id').unsigned()
      .references('id').inTable('tags');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes_tags');
};
