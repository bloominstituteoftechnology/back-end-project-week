
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
        notes.increments();

        notes
            .string('note', 500)
            .notNullable();
        notes.string('username', 128)
            .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
