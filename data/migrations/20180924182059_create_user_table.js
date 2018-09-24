exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments();

    tbl.string("email").unique('uq_email');

    tbl.string("username").notNullable().unique('uq_username');

    tbl.string("password").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
