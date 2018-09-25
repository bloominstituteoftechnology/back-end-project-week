exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(table) {
    table.increments();

    table.string("title", 128).notNullable();

    table.string("textBody").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
