
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
      notes.increments();

      notes
        .string('notes', 500)
        .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
