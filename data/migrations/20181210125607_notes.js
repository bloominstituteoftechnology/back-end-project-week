
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', tbl => {
      tbl.increments();
      tbl.string('title', 255);
      tbl.string('textBody', 2000);
      tbl.unique('tags', 255);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
