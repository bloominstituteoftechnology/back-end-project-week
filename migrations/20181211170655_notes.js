exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments();

    tbl.string('title', 128).notNullable();
    tbl.string('description', 255);

    tbl.boolean('complete').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
