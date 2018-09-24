
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
      tbl
        .increments();
      tbl
        .string('note_title', 128)
        .notNullable();
      tbl
        .string('note_content')
        .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
