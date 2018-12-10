
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (tbl) => {
      tbl.increments();
      tbl.string('title', 250).notNullable();
      tbl.string('textBody');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
