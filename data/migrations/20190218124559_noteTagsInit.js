
exports.up = function(knex, Promise) {
  return knex.schema.createTable('noteTags', function (table) {
    table.increments();
    table.integer('note_id').unsigned().notNullable();
    table.foreign('note_id').references('id').on('notes');
    table.integer('tag_id').unsigned().notNullable();
    table.foreign('tag_id').references('id').on('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('noteTags');
};
