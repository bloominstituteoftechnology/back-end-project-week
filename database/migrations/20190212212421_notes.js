exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", notes => {
    notes.increments();
    notes.text("title").notNullable();
    notes.text("textBody");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
