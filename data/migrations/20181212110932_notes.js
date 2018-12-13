exports.up = function(knex) {
  return knex.schema.createTable("notes", function(notes) {
    notes.increments();

    notes.string("title", 128).notNullable();
    notes.string("textBody", 228).notNullable();
    notes
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
