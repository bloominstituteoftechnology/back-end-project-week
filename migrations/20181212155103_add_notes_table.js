
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
      table.increments();
      table.string('title', 255).notNullable();
      table.string('content', 1000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
