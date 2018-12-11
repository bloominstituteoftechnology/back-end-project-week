exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();

    tbl
      .string('title', 255)
      .notNullable()
      .unique();
    tbl.string('textBody', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('notes');
};
