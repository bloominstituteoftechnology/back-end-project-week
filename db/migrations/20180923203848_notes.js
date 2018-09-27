exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", tbl => {
    tbl.increments();
    tbl.string("Title").notNullable();
    tbl.string("Content").notNullable();
    tbl.string("Tags");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};
