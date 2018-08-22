
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();
    table.string('title').notNullable();
    table.text('content').notNullable();
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('notes');
};
