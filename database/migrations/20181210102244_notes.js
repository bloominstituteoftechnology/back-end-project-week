exports.up = knex =>
  knex.schema.createTable("notes", notes => {
    notes.increments();
    notes
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    notes.string("title", 128).notNullable();
    notes.text("content").notNullable();
    notes.integer("created").defaultTo(Date.now());
    notes.integer("modified").defaultTo(Date.now());
  });

exports.down = knex => knex.schema.dropTableIfExists("notes");
