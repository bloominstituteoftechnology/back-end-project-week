exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", notes => {
    notes.increments();

    notes
      .string("title", 128)
      .notNullable()
      .unique();
    notes.string("text_body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
