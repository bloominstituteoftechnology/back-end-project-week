exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", tbl => {
    tbl.increments();

    tbl.text("title", 255).notNullable();
    tbl.text("textBody");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
