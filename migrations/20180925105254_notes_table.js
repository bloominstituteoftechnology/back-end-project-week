
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
      tbl.increments();

      tbl
        .string('title')
        .notNullable()
        .unique()

     tbl
        .string('textBody')
        .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
};
