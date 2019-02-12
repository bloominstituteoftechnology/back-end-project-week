exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", table => {
    table.increments();
    table.string("title").notNullable();
    table.string("textBody", 2000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
