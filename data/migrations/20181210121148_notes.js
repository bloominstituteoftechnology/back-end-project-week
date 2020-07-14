exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments();
    tbl.string("title");
    tbl.string("content");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
