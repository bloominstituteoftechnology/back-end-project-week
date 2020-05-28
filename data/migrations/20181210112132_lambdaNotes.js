
exports.up = function(knex) {
  return knex.schema.createTable('notes', notes => {
    notes.increments();
    notes
      .string('title')
      .notNullable();
    notes
      .string('content')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
