exports.up = knex =>
  knex.schema.createTable("notes", notes => {
    notes.increments();
    notes
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("users.id")
    notes.string("title", 128).notNullable();
    notes.text("content").notNullable();
    notes.timestamp("created").defaultTo(knex.fn.now());
    notes.timestamp("modified").defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists("notes");
