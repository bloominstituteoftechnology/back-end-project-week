
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();
    tbl.string('title', 255)
      .notNullable()
    tbl.string('textBody', 511);
    tbl.json('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
