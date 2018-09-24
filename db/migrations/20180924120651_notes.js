
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(notes) {
    notes.increments();

    notes
      .string('title')
      .notNullable()
      .unique('title');

    notes
      .string('note')
      .notNullable();

    notes
      .boolean('editing')
      .notNullable()
      .defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('notes')
};
