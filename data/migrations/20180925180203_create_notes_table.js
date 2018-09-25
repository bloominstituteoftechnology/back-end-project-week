exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(table) {
    table.increments();
    table.string("title").notNullable();
    table.string("content").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};
