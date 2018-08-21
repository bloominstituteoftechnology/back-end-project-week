
exports.up = function(knex, Promise) {
  // create notes table
  return knex.schema.createTable('notes', function(tbl) {
      // pk
      tbl.increments('notes_id');
      tbl.string('title').notNullable();
      tbl.string('content').notNullable();
  })
};

exports.down = function(knex, Promise) {
  // drop notes table
  return knex.schema.dropTableIfExists('notes');
};
