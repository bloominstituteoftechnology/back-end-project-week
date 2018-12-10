exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', note => {
    note.increments();

    note.string('title', 255).notNullable();
    note.string('content', 5000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('fixed notes');
};
