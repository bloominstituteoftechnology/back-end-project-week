exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    tbl.increments();
    tbl
      .string('title', 128)
      .notNullable()
      .unique();
    tbl
      .string('content')
  });
};

exports.down = function(knex, Promise) {
  
};

