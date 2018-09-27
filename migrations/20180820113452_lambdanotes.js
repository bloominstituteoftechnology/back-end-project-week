
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
     table.increments();
    table.string('_id').notNullable().unique();
    table.string('title');
    table.string('content');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('notes')
};
