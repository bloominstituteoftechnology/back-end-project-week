exports.up = function(knex, Promise) {
  return knex.schema.createTabel('notes', notes => {
    notes.increments();

    notes 
      .string('title')
      .notNullable()
      .unique();

    notes
      .string('content')
      .notNullable();

    notes 
      .boolean('editing')
      .notNullable()
      .defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};