exports.up = function(knex) {
  return knex.schema.createTable("notes", note => {
    note.increments();

    note.string("title", 128).notNullable();

    note.string("textBody", 228).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
