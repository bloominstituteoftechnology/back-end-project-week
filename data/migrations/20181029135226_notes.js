
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments();

    tbl.string('title').notNullable();
    tbl.string('textBody').notNullable();
    tbl.string('tags').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
