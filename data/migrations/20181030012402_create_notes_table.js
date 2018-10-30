
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(table) {
    table.increments();
    table.string('title', 128).notNullable();
    table.string('content', 140); // we're Twitter for now, will update later
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
