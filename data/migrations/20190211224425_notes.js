
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();

    table.string('title', 255).notNullable();
    table.string('content', 10000).notNullable();
    table.timestamp('time_posted', true).defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
