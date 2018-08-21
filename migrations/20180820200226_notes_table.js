
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table =>{
    table.increments();
    table.string('note_title', 255).notNullable();
    table.text('text_body').notNullable();
    table.string('tags');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('notes');
};
