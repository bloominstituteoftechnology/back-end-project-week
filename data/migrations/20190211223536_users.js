
exports.up = function(knex, Promise) {
  knex.schema.createTable('notes', function(table) {
    table.increments('noteId');
    table.integer('userId').unsigned().notNullable();
    table.string('title');
    table.string('textBody');

    table.foreign('userId').references('userId').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
