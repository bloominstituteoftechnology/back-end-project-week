
exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments().primary();
    tbl.string("title").notNullable();
    tbl.text("body").notNullable();
    tbl.text("checklist");
    tbl.text("tags");
    tbl.integer("userID").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
