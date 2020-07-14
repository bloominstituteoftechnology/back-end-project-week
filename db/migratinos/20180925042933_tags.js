exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
    tbl.increments();
    tbl.string('tag_name', 255).notNullable();
    tbl
      .integer('note_id')
      .unsigned()
      .notNullable()
      .references('notes.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
