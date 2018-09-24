exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", notes => {
    notes.increments();

    notes
      .string("title", 70)
      .notNullable()
      .unique();

    notes.string("note");

    notes.boolean("editToggle").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("notes", function(tbl) {
    tbl.dropColumn("notes");
  });
};
