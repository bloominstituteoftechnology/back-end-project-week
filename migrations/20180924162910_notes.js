
exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
      tbl.increments();
      tbl.string("title", 160).notNullable();
      tbl.string("content", 500).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
