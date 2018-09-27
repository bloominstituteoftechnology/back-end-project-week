exports.up = function(knex, Promise) {
  return knex.schema.createTable("List", table => {
    table.increments(`id`).primary(),
      table.string("list_name").notNullable(),
      table.text("description").notNullable(),
      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("Users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("List");
};
