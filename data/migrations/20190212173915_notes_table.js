
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes',
  table => {
    table.increments();
    table.string('note_title').notNullable();
    table.string('note_content')

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
