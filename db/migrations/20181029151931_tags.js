
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
    tbl.increments();
    tbl.string('tag_name', 255).notNullable();
    tbl.integer('note_id')
    // Can only represent non-negative numbers (zero or positive numbers)
      .unsigned()
      .notNullable()
      .references('notes.id')
    // Deletes all it's references and attached data too
      .onDelete('CASCADE');
  });
};
 exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
