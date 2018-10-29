
exports.up = function(knex, Promise) {
  return knex.schema.createTable('note_table', function(table) {
    table.increments('note_id');
    table.string('note_title', 128).notNullable();
    table.string('note_body', 300).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('note_table');
};  
