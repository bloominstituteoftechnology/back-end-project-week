exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(notes) {
      notes.increments();
      notes.string('title', 128).notNullable();
      notes.text('contents').notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };
  