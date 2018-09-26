exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(table) {
    table.increments();
    table.string('title').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
