exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", notes => {
    notes.increments("_id");

    notes
      .string("tags")
      .notNullable()
      .defaultTo("");
    notes.string("title").notNullable();
    notes.string("textBody").notNullable();
    notes
      .int("__v")
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTableIfExists("notes");
};
