exports.up = function(knex) {
  return knex.schema.createTable('notes', notes => {
    notes.increments();
    notes
      .string('title')
      .notNullable();
    notes
      .string('content')
      .notNullable();
    notes
      .integer('userId');
    notes
      .foreign('userId')
      .references('users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

