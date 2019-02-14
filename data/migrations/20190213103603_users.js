exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments("id");

    table.string("name", 255).notNullable();
    table
      .string("email", 255)
      .notNullable()
      .unique();
    table.string("password").notNullable();
    table.string("role").defaultTo("user");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
