exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", table => {
    table.increments();
    table
      .integer("note_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("notes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("tag").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
