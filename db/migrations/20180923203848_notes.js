exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", tbl => {
    tbl.increments();
    tbl.string("Title").notNullable();
    tbl.string("Content").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};
