
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl
      .increments('id');
    tbl
      .string('title', 128)
      .notNullable();
    tbl
      .string('body', 255)
      .notNullable();
    tbl
      .timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema(dropTableIfExists);
};
