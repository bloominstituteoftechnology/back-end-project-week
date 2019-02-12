
exports.up = function(knex, Promise) {
   knex.schema.createTable('notes' , table => {
       table.increments('noteId');
       table.string('title').notNullable();
       table.text('noteBody').notNullable();
   })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('notes')
};
