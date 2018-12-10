exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();

    tbl
      .string('Note Title', 255)
      .notNullable()
      .unique();
    tbl.text('Note Content', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('notes');
};
