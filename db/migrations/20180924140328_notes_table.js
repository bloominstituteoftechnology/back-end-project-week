
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
    notes.increments('noteId');

    notes.string('note_title').notNullable();
    notes.string('url_title').notNullable();
    notes.string('note_content').notNullable();

    notes
    .int('userId')
    .unsigned()
    .notNullable()
    .references('userId')
    .inTable('users');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
