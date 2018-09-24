exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique("notes_name");

    tbl.string("content").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
