exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", tbl => {
    //give the table an auto-incrementing, unique id
    tbl.increments();

    tbl.string("title", 255).notNullable();
    tbl.string("content", 9000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
