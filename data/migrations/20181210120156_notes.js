exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (tbl) => {
    tbl.increments();
    tbl.string('title').notNullable();
    tbl.string('textBody', 30000).notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
