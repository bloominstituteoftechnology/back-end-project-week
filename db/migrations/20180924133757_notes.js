
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(notes) {
      notes.increments();

      notes.string('title');
      notes.text('content');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
