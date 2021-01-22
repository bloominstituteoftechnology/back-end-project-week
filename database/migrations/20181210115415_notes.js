
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', notes => {
        //Create a note with a title and content.
        notes.increments();
        notes.string('title', 255).notNullable();
        notes.text('content').notNullable();
    })
  
};

exports.down = function(knex, Promise) {
     return knex.schema.dropTableIfExists('notes');
};
