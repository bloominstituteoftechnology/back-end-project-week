exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags_for_notes', function(table) {
    table.increments();
    table
      .integer('note_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('notes');
    table
      .integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags_for_notes');
};
