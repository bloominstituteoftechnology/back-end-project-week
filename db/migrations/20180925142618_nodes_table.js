exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(table) {
    table.increments();

    table.string("title", 30).notNullable();

    table.string("content", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
