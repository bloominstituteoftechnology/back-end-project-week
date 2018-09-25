
exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments();

    tbl.string("title").notNullable();

    tbl.text("content").notNullable();

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
