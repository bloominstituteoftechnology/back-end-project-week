
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', note => {
      note.increments(); 
      note.string('title', 50).notNullable(); 
      note.string('content', 128).notNullable(); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes'); 
};
