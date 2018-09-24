
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments();
    tbl.string('title', 128)
        .notNullable()
        .unique('title');
    tbl.string('textBody')
        .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('textBody');
};
