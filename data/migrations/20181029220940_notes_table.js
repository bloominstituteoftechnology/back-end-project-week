exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments();
    tbl.string("title", 255).notNullable();
    tbl.unique("title");
    tbl.string("content", 255).notNullable();
    tbl.string("tags", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
