exports.up = function(knex) {
  return knex.schema.createTable("notes", notes => {
    notes.increments();

    notes.string("title", 128).notNullable();
    notes.string("textBody", 228).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
