exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", tbl => {
    tbl.increments();
    tbl.string("Title").notNullable();
    tbl.string("Content").notNullable();
    tbl.string("Tags");
    tbl // foreign key that is used to connect notes with a user
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};
