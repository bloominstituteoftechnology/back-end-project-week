exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
    notes.increments();

    notes
      .string('title')
      .notNullable()
      .unique();
    notes
      .string('textBody')
      .notNullable();
    notes
      .boolean('eediting')
      .notNullable()
      .defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};