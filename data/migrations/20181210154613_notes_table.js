exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", table => {
    table.increments();

    table.string("title", 128).notNullable();

    table.text("message").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
