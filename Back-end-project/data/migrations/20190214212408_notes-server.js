
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Notes', eachNote => {
        eachNote.increments();
        eachNote.string('Note-Title').notNullable();
        eachNote.string('Note-Body').notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Notes');
  };
  
