
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
    notes.increments();

    notes
      .string('title', 128)
      .notNullable()
      .unique();

    notes
      .text('note_text')
      .notNullable()
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};