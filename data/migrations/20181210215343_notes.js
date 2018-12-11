exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();

    table.string('title', 50).notNullable();

    table.string('content').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
