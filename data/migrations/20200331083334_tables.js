exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments();
      users.string("username", 128).notNullable().unique();
      users.string("password", 128).notNullable();
      users.string("role", 128).defaultTo("client");
    })
    .createTable("categories", (tbl) => {
      tbl.increments();
      tbl.string("name", 50).notNullable().unique();
      tbl.string("description", 255);
    })
    .createTable("notes", (tbl) => {
      tbl.increments();
      tbl.string("title").notNullable();
      tbl.string("content").notNullable();
    })
    .createTable("user-categories", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.boolean("categoryTesting").notNullable().defaultTo(false);
    })
    .createTable("mastery", (tbl) => {
      tbl
        .integer("flashcard_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("flashcards")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.integer("mastery").notNullable().defaultTo(0);
      tbl.integer("countUp").notNullable().defaultTo(0);
      tbl.integer("countDown").notNullable().defaultTo(0);
      tbl.boolean("last").notNullable().defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("mastery")
    .dropTableIfExists("user-categories")
    .dropTableIfExists("notes")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
