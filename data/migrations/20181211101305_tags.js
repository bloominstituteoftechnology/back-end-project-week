exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", tbl => {
    tbl.increments();
    tbl.string("text", 100).notNullable();
    tbl
      .integer("notes_id")
      .unsigned()
      .references("notes.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
