exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments('id').primary();
    users
      .string("username", 255)
      .notNullable()
      .unique();
    users
      .string("first", 255)
      .notNullable()
      .unique();
    users
      .string("last", 255)
      .notNullable()
      .unique();
    users
      .string("email", 255)
      .notNullable()
      .unique();
    users.string("password", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
