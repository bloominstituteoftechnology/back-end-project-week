
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
    tbl.increments();
    // small character limit for title
    tbl.string('title', 60).notNullable();
    tbl.string('textBody', 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
