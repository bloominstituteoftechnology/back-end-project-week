
exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments().primary();
    tbl.string("title").notNullable();
    tbl.string("body").notNullable();
    tbl.string("checklist");
    tbl.string("tags");
    tbl.number("userID").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
