
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        /*
        {
            "tags": ["tag", "otherTag"],
            "title": "Note Title",
            "textBody": "Note Body",
        }
        */
       table.increments('noteId');
       table.string('title', 128).notNullable();
       table.string("textBody", 256);
       table.json('tags');
       table.integer('userId')
        .unsigned()
        .references('userId')
        .inTable('users')
        .notNullable();

    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
