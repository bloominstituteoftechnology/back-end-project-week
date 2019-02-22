exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", notes => {
    notes.increments("id").primary();
    notes.string("title", 255).notNullable();
    notes.string("content", 2000).notNullable();
    notes.timestamps(true, true);
    notes.integer("user_id").unsigned();
    notes
      .foreign("user_id")
      .references("id")
      .on("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
