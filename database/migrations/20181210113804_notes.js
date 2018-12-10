
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        /*
        {
            "tags": ["tag", "otherTag"],
            "title": "Note Title",
            "textBody": "Note Body",
        }
        */
       table.increments();
       table.string('title', 128).notNullable();
       table.string("textBody", 256);
       table.json('tags');
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
