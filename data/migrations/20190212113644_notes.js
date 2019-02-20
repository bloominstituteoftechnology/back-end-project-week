
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
      table.increments();
      table.string('title', 255).notNullable();
      table.text('textBody').notNullable();
      table.string('tags', 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
