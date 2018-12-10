exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (tbl) => {
    tbl.increments();
    tbl.string('title');
    tbl.string('textBody', 30000);
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
