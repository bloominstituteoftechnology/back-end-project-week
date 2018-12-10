exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    // Auto increments ID of record
    table.increments();
    // Title of record
    table.string('title', 50).notNullable();
    // Body of note
    table.string('content').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
