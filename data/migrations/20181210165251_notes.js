
exports.up = function(knex, Promise) {
  knex.schema.createTable('notes', (note)=>{
      note.increments();
      note.string('title', 255).notNullable();
      note.string('note', 500).notNullable();
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('notes')
};
