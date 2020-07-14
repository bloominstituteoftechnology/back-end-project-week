exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    //primary key
    tbl.increments();

    tbl.string("title", 128).notNullable();
    tbl.string("content", 255);

    tbl.boolean("complete").defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
