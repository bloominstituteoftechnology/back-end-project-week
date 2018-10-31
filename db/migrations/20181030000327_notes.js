
exports.up = function (knex, Promise) {
    return knex.schema.withSchema("public").createTable("Notes", table => {
      table.increments("id").primary();
      table.string("title", 128).notNullable();
      table.string("textBody", 100000).notNullable();
      table.text("content").notNullable();
      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema("public").dropTableIfExists("Notes");
};
