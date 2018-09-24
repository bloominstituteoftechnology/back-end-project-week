
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
      tbl
        .increments();
      tbl
        .string('title', 128)
        .notNullable();
      tbl
        .string('textBody')
        .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
