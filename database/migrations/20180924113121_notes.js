exports.up = function(knex) {
    return knex.schema.createTable("notes", notes => {
      notes.increments();
      notes.string("title").notNullable();
      notes.text("textBody");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("notes");
  };
  