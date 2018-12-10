
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (note)=>{
      note.increments();
      note.string('title', 255).notNullable();
      note.string('note', 500).notNullable();
  })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('notes')
};
