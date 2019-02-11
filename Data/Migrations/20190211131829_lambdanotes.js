
exports.up = function(knex, Promise) {
   knex.schema.createTable('notes' , table => {
       table.increments('notesId');
       table.string('title')
   })
};

exports.down = function(knex, Promise) {
  
};
