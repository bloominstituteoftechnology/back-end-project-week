
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(table) {
      table.increments();
      table.string('title').unique().notNullable();
      table.string('content');
    })
  }

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes');
  }
