exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", table => {
    table.increments();
    table.string("title").notNullable();
    table
      .integer("note_id")
      .notNullable()
      .references("id")
      .inTable("notes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tags");
};