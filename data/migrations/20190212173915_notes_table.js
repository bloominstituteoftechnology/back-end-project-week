
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes_table',
  notes => {
    
    notes.increments();
    notes.string('note_title').notNullable();
    notes.string('note_content');

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes_table');
};
