
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments();
    tbl.string('title', 255).notNullable();
    tbl.text('textBody').notNullable();
  });
};
 exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};