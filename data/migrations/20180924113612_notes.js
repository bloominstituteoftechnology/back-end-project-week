
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', notes => {
      notes.increments();
      notes.string('title', 120).notNullable();
      notes.string('text', 2222).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
